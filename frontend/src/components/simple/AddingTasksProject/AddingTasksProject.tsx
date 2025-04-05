import { FC } from 'react';
import Button from '../../UI/Button/Button';
import styles from './AddingTasksProject.module.scss';
interface Int {
  setSwitchCurrentProject: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitcher: React.Dispatch<React.SetStateAction<boolean>>;
  modalActive: boolean;
  close: () => void;
}
const AddingTasksProject: FC<Int> = ({
  setSwitchCurrentProject,
  setSwitcher,
  modalActive,
  close,
}: Int) => {
  const actionSwitch = (): void => {
    setSwitchCurrentProject(true);
    setSwitcher(false);
  };
  return (
    <div className={modalActive ? styles.modalActive : styles.modal}>
      <Button onClick={actionSwitch}>Добавить задачи в текущие проекты</Button>
      <Button onClick={() => setSwitcher(false)}>Создать новый проект</Button>
      <Button onClick={close}>Закрыть</Button>
    </div>
  );
};

export default AddingTasksProject;
