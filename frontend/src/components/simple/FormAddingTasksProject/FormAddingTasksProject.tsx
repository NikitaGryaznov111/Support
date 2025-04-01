import { FC } from 'react';
import Button from '../../UI/Button/Button';
import styles from './FormAddingTasksProject.module.scss';
interface Int {
  setSwitchCurrentProject: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitcher: React.Dispatch<React.SetStateAction<boolean>>;
  modalActive: boolean;
  close: () => void;
}
const FormAddingTasksProject: FC<Int> = ({
  setSwitchCurrentProject,
  setSwitcher,
  modalActive,
  close,
}: Int) => {
  return (
    <form action="" className={modalActive ? styles.modalActive : styles.modal}>
      <button
        onClick={() => setSwitchCurrentProject(true)}
        className={styles.btn}
      >
        Добавить задачи в текущие проекты
      </button>
      <Button onClick={() => setSwitcher(false)}>Создать новый проект</Button>
      <Button onClick={close}>Закрыть</Button>
    </form>
  );
};

export default FormAddingTasksProject;
