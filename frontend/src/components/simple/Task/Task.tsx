import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import {
  StorageProjects,
  StorageTasks,
  StorageTimeTask,
} from '../../../utils/forStorage';
import { TypeTaskProps } from '../../../utils/types';
import styles from './Task.module.scss';

const Task: FC<TypeTaskProps> = ({
  task,
  userId,
  index,
  checkedAll,
  updateToggle,
  projectId,
}: TypeTaskProps) => {
  const [checkedTask, setCheckedTask] = useState<boolean>(false);
  useEffect(() => {
    checkedAll ? setCheckedTask(true) : setCheckedTask(false);
  }, [checkedAll]);

  const handleDeletedTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const li = (e.target as HTMLButtonElement).closest('li');
    const taskId = li!.dataset.taskid;
    if (projectId) {
      await StorageProjects.deletedTask(projectId, taskId!);
      updateToggle!();
    } else {
      await StorageTasks.deletedTask(taskId);
      await StorageTimeTask.deletedTime(taskId);
      updateToggle!();
    }
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
          <span>{task.taskName}</span>
        </h3>
        <p>{task.description}</p>
      </Link>
      <div className={styles.buttons}>
        {projectId ? (
          <Link to={`/${userId}/projects/${projectId}/${task.taskId}`}>
            <Button>Edit</Button>
          </Link>
        ) : (
          <Link to={`/${userId}/tasks/editTask/${task.taskId}`}>
            <Button>Edit</Button>
          </Link>
        )}

        <Button onClick={handleDeletedTask}>Delete</Button>
      </div>
    </li>
  );
};

export default Task;
