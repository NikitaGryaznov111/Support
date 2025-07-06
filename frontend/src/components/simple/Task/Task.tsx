import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import { TypeTaskProps } from '../../../utils/types';
import styles from './Task.module.scss';
import { StorageProjects } from '../../../utils/storage/storageProjects';
import { StorageTimeTask } from '../../../utils/storage/storageTimeTask';
import { StorageTasks } from '../../../utils/storage/storageTasks';

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
    if (checkedAll) {
      setCheckedTask(true);
    } else {
      setCheckedTask(false);
    }
  }, [checkedAll]);

  const handleDeletedTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const li = (e.target as HTMLButtonElement).closest('li');
    if (!li) return;
    const taskId = li.dataset.taskid;
    if (!taskId) return;
    if (projectId) {
      await StorageProjects.deletedTask(projectId, taskId);
      await StorageTimeTask.deletedTime(taskId, projectId);
      updateTasks!();
    } else {
      await StorageTasks.deletedTask(taskId);
      await StorageTimeTask.deletedTime(taskId, projectId);
      updateTasks!();
    }
  };
  const taskPath: string = projectId
    ? `/${userId}/projects/${projectId}/fromProject/${task.taskId}`
    : `/${userId}/tasks/${task.taskId}`;

  const editTaskPath: string = projectId
    ? `/${userId}/projects/${projectId}/${task.taskId}`
    : `/${userId}/tasks/editTask/${task.taskId}`;

  return (
    <li data-taskid={task.taskId} className={styles.taskItem}>
      <input
        className={styles.taskCheckbox}
        type="checkbox"
        checked={checkedTask}
        onChange={(e) => setCheckedTask(e.target.checked)}
      />
      <Link to={taskPath} className={styles.taskLink}>
        <div>
          {' '}
          <h3 className={styles.taskHeader}>
            <span className={styles.taskIndex}>{index + 1}.</span>
            <span>{task.taskName}</span>
          </h3>
          <p>{task.description}</p>
        </div>
      </Link>
      <div className={styles.buttons}>
        <Link to={editTaskPath}>
          <Button>Изменить</Button>
        </Link>
        <Button onClick={handleDeletedTask}>Удалить</Button>
      </div>
    </li>
  );
};

export default Task;
