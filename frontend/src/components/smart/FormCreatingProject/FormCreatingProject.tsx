import { FC, useActionState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TypeFormData, TypeProject, TypeTask } from '../../../utils/types';
import { StorageProjects } from '../../../utils/forStorage';
import Button from '../../UI/Button/Button';
import { nanoid } from 'nanoid';
import { MyContext } from '../../../routes/MyContext';
import styles from './FormCreatingProject.module.scss';

interface Int {
  selectedTasksProject: TypeTask[];
  modalActive: boolean;
  setSwitcher: React.Dispatch<React.SetStateAction<boolean>>;
  projects?: TypeProject[];
  close: () => void;
}
const FormCreatingProject: FC<Int> = ({
  selectedTasksProject,
  modalActive,
  setSwitcher,
  projects,
  close,
}) => {
  const projectId: string = nanoid(6);
  const { userId } = useParams();
  const setAppStyles = useContext(MyContext);
  const navigate = useNavigate();

  const initProject: TypeProject = {
    name: '',
    projectId,
    tasks: [],
  };

  const handleSaveTasksInProject = async (
    prevState: TypeProject,
    formData: TypeFormData
  ) => {
    const project: TypeProject = {
      name: formData.get('nameProject'),
      projectId,
      tasks: selectedTasksProject,
    };
    if (!project.name) {
      alert('Пожалуйста введите название проекта');
    } else {
      await StorageProjects.addProject(project);
      setAppStyles('');
      navigate(`/${userId}/projects`);
    }
    return project;
  };
  const [state, formAction] = useActionState(
    handleSaveTasksInProject,
    initProject
  );
  return (
    <form
      action={formAction}
      className={modalActive ? styles.modalActive : styles.modal}
    >
      {projects && (
        <button
          className={styles.btnBack}
          onClick={() => setSwitcher(true)}
          title="Назад"
        ></button>
      )}

      <label htmlFor="nameProject">Название проекта:</label>
      <input
        type="text"
        name="nameProject"
        id="nameProject"
        placeholder="Имя проекта"
      />
      <Button type="submit">Добавить в проект</Button>
      <Button onClick={close}>Закрыть</Button>
    </form>
  );
};

export default FormCreatingProject;
