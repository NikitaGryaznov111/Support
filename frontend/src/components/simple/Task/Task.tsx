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
  updateTasks,
  projectId,
}) => {
  const [checkedTask, setCheckedTask] = useState<boolean>(false);

  useEffect(() => {
    checkedAll ? setCheckedTask(true) : setCheckedTask(false);
  }, [checkedAll]);

  const handleDeletedTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const li = (e.target as HTMLButtonElement).closest('li');
    const taskId = li!.dataset.taskid;
    if (projectId) {
      await StorageProjects.deletedTask(projectId, taskId!);
      await StorageTimeTask.deletedTime(taskId, projectId);
      updateTasks!();
    } else {
      await StorageTasks.deletedTask(taskId);
      await StorageTimeTask.deletedTime(taskId, projectId);
      updateTasks!();
    }
  };
  return (
    <li data-taskid={task.taskId} className={styles.taskItem}>
      <input
        className={styles.taskCheckbox}
        type="checkbox"
        checked={checkedTask}
        onChange={(e) => setCheckedTask((e.target.checked = !checkedTask))}
      />
      <Link
        to={
          projectId
            ? `/${userId}/projects/${projectId}/fromProject/${task.taskId}`
            : `/${userId}/tasks/${task.taskId}`
        }
        className={styles.taskLink}
      >
        <h3 className={styles.taskHeader}>
          <span className={styles.taskIndex}>{index + 1}.</span>
          <span>{task.taskName}</span>
        </h3>
        <p>{task.description}</p>
      </Link>
      <div className={styles.buttons}>
        <Link
          to={
            projectId
              ? `/${userId}/projects/${projectId}/${task.taskId}`
              : `/${userId}/tasks/editTask/${task.taskId}`
          }
        >
          <Button>Изменить</Button>
        </Link>
        <Button onClick={handleDeletedTask}>Удалить</Button>
      </div>
    </li>
  );
};

export default Task;
