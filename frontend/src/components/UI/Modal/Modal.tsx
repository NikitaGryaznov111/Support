import { FC } from 'react';
import Button from '../Button/Button';
import styles from './Modal.module.scss';
type Props = {
  modalActive: boolean;
};
const Modal: FC<Props> = ({ modalActive }: Props) => {
  const handleSaveProject = () => {};
  return (
    <form action="" className={modalActive ? styles.modalActive : styles.modal}>
      <label htmlFor="nameProject">Название проекта:</label>
      <input
        type="text"
        name="nameProject"
        id="nameProject"
        placeholder="Имя проекта"
      />
      <Button onClick={handleSaveProject}>Добавить в проект</Button>
    </form>
  );
};

export default Modal;
