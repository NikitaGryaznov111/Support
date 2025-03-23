import { FC, useActionState } from 'react';
import { nanoid } from 'nanoid';
import Button from '../Button/Button';
import styles from './Modal.module.scss';
import {
  TypePropsModal,
  TypeProject,
  TypeFormData,
} from '../../../utils/types';

const Modal: FC<TypePropsModal> = ({
  modalActive,
  selectedTasksProject,
  closeModal,
}: TypePropsModal) => {
  const projectId = nanoid(6);

  const initProject: TypeProject = {
    name: '',
    projectId,
    tasks: [],
  };
  const handleSaveTasksInProject = (
    prevState: TypeProject,
    formData: TypeFormData
  ) => {
    const savedProject: TypeProject = {
      name: formData.get('nameProject'),
      projectId,
      tasks: selectedTasksProject,
    };

    console.log(savedProject);
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
      <Button onClick={closeModal}>Закрыть</Button>
    </form>
  );
};

export default Modal;
