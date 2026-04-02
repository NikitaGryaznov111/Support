import { FC, FormEvent, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TypeProject, TypeTask } from '../../../types/types';
import Button from '../../UI/Button/Button';
import { nanoid } from 'nanoid';
import { AppStyleContext } from '../../../context/AppStylesContext';
import styles from './FormCreatingProject.module.scss';
import { StorageProjects } from '../../../utils/storage/storageProjects';
interface IProps {
  selectedTasksProject: TypeTask[];
  modalActive: boolean;
  setSwitcher: React.Dispatch<React.SetStateAction<boolean>>;
  projects?: TypeProject[];
  close: () => void;
}
const FormCreatingProject: FC<IProps> = ({
  selectedTasksProject,
  modalActive,
  setSwitcher,
  projects,
  close,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { userId } = useParams();
  const setAppStyles = useContext(AppStyleContext);
  const navigate = useNavigate();

  const handleSaveTasksInProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const project: TypeProject = {
      name: formData.get('nameProject') as string,
      projectId: nanoid(6),
      userId,
      tasks: selectedTasksProject,
    };
    if (!project.name) {
      alert('Пожалуйста введите название проекта');
      return;
    }
    setLoading(true);
    try {
      await StorageProjects.addProject(project);
      setAppStyles('');
      navigate(`/${userId}/projects`);
    } catch (error) {
      console.error('Ошибка при создании проекта:', error);
      alert('Не удалось создать проект. Пожалуйста, попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSaveTasksInProject}
      className={modalActive ? styles.modalActive : styles.modal}
    >
      {projects?.length ? (
        <button
          className={styles.btnBack}
          onClick={() => setSwitcher(true)}
          title="Назад"
          aria-label="Вернуться к предыдущему шагу"
          type="button"
        ></button>
      ) : null}

      <label htmlFor="nameProject">Название проекта:</label>
      <input
        type="text"
        name="nameProject"
        id="nameProject"
        placeholder="Имя проекта"
      />
      <Button type="submit">
        {loading ? 'Создание проекта' : 'Добавить в проект'}
      </Button>
      <Button onClick={close}>Закрыть</Button>
    </form>
  );
};

export default FormCreatingProject;
