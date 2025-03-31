import { FC, useActionState, useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Button from '../Button/Button';
import styles from './Modal.module.scss';
import {
  TypePropsModal,
  TypeProject,
  TypeFormData,
} from '../../../utils/types';
import { StorageProjects } from '../../../utils/forStorage';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { MyContext } from '../../../routes/MyContext';
import CurrentProjects from '../../smart/CurrentProjects/CurrentProjects';

const Modal: FC<TypePropsModal> = ({
  modalActive,
  selectedTasksProject,
  closeModal,
}: TypePropsModal) => {
  const [projects, setProjects] = useState<TypeProject[]>();
  const [switchCreatingProject, setSwitchCreatingProject] =
    useState<boolean>(true);
  const [switchCurrentProject, setSwitchCurrentProject] =
    useState<boolean>(false);
  const { userId } = useParams();
  const navigate: NavigateFunction = useNavigate();
  const projectId: string = nanoid(6);
  const setAppStyles = useContext(MyContext);
  const initProject: TypeProject = {
    name: '',
    projectId,
    tasks: [],
  };

  useEffect(() => {
    const init = async (): Promise<void> => {
      setProjects(await StorageProjects.getProjects());
    };
    init();
  }, []);
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
  const close = (): void => {
    closeModal();
    setSwitchCreatingProject(true);
    setSwitchCurrentProject(false);
  };

  return (
    <>
      {projects && switchCreatingProject ? (
        <form
          action=""
          className={modalActive ? styles.modalActive : styles.modal}
        >
          <Button onClick={() => setSwitchCurrentProject(true)}>
            Добавить задачи в текущие проекты
          </Button>
          <Button onClick={() => setSwitchCreatingProject(false)}>
            Создать новый проект
          </Button>
          <Button onClick={close}>Закрыть</Button>
        </form>
      ) : (
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
      )}
      <CurrentProjects
        modalActive={switchCurrentProject}
        close={close}
        projects={projects}
        selectedTasksProject={selectedTasksProject}
      />
    </>
  );
};

export default Modal;
