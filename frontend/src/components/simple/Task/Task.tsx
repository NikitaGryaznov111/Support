import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import {
  deletedTaskStorage,
  deletedTimeStorage,
} from '../../../utils/forStorage';
import { TypeTaskProps } from '../../../utils/types';
import styles from './Task.module.scss';

const Task: FC<TypeTaskProps> = ({
  task,
  userId,
  index,
  checkedAll,
  updateToggle,
}: TypeTaskProps) => {
  const [checkedTask, setCheckedTask] = useState<boolean>(false);
  useEffect(() => {
    checkedAll ? setCheckedTask(true) : setCheckedTask(false);
  }, [checkedAll]);

  const handleDeletedTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const li = (e.target as HTMLButtonElement).closest('li') as HTMLLIElement;
    const taskId = li.dataset.taskid;
    await deletedTaskStorage(taskId);
    await deletedTimeStorage(taskId as string);
    updateToggle();
  };
  return (
    <li data-taskid={task.taskId} className={styles.taskItem}>
      <input
        className={styles.taskCheckbox}
        type="checkbox"
        checked={checkedTask}
        onChange={(e) => setCheckedTask((e.target.checked = !checkedTask))}
      />{' '}
      <Link to={`/${userId}/tasks/${task.taskId}`} className={styles.taskLink}>
        <h3 className={styles.taskHeader}>
          <span className={styles.taskIndex}>{index + 1}.</span>
          {task.task}
        </h3>
        <p>{task.description}</p>
      </Link>
      <div className={styles.buttons}>
        <Link to={`/${userId}/tasks/editTask/${task.taskId}`}>
          <Button>Edit</Button>
        </Link>
        <Button onClick={handleDeletedTask}>Delete</Button>
      </div>
    </li>
  );
};

export default Task;
