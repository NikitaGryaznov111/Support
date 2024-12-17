import { FC } from 'react';
import { TypeTask } from '../../smart/FormTasks/FormTasks';
import styles from './Task.module.scss';
import Button from '../../UI/Button';
import { Link } from 'react-router-dom';
type TypeTaskProps = {
  task: TypeTask;
  userId: string | undefined;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
const Task: FC<TypeTaskProps> = ({ task, userId, onClick }: TypeTaskProps) => {
  return (
    <li data-taskid={task.taskId} className={styles.taskItem}>
      {' '}
      <Link to={`/${userId}/tasks/${task.taskId}`}>
        <h3>{task.task}</h3>
        <p>{task.description}</p>
      </Link>
      <div className={styles.buttons}>
        <Link to={`/${userId}/tasks/editTask/${task.taskId}`}>
          <button type="button">Edit</button>
        </Link>
        <Button onClick={onClick}>Delete</Button>
      </div>
    </li>
  );
};

export default Task;
