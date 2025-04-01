import { FC, useActionState, useContext } from 'react';
import { TypeFormData, TypeProject, TypeTask } from '../../../utils/types';
import { StorageProjects } from '../../../utils/forStorage';
import Button from '../../UI/Button/Button';
import styles from './FormCreatingProject.module.scss';
import { nanoid } from 'nanoid';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { MyContext } from '../../../routes/MyContext';

interface Int {
  selectedTasksProject: TypeTask[];
  modalActive: boolean;
  close: () => void;
}
const FormCreatingProject: FC<Int> = ({
  selectedTasksProject,
  modalActive,
  close,
}) => {
  const projectId: string = nanoid(6);
  const { userId } = useParams();
  const setAppStyles = useContext(MyContext);
  const navigate: NavigateFunction = useNavigate();

  const initProject: TypeProject = {
    name: '',
    projectId,
    tasks: [],
  };

  const handleSaveTasksInProject = async (
    prevState: TypeProject,
    formData: TypeFormData
  ): Promise<void> => {
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
  };
  const [state, formAction] = useActionState(
    handleSaveTasksInProject as any,
    initProject
  );
  return (
    <form
      action={formAction}
      className={modalActive ? styles.modalActive : styles.modal}
    >
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
