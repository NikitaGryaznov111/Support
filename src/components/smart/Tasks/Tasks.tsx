import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTasksStorage, deletedTasksStorage } from '../../../forStorage';
import { TypeTask } from '../FormTasks/FormTasks';
import styles from './Task.module.scss';
import { useDispatch } from 'react-redux';
type Props = {
  input: TypeTask;
};
const Tasks: FC<Props> = (props: Props) => {
  const [tasks, setTasks] = useState<TypeTask[]>();
  const { userId } = useParams();
  useEffect(() => {
    const init = async () => {
      setTasks(await getTasksStorage());
    };
    init();
  }, [props.input]);

  const handleDeletedTask = async (e: any) => {
    const li = e.currentTarget.parentNode?.parentNode;
    const nanoId = li.dataset.nanoid;
    await deletedTasksStorage(nanoId);
    setTasks(await getTasksStorage());
  };
  return (
    <div>
      <h1>Задачи:</h1>
      {tasks ? (
        <ul>
          {tasks.map(
            (input: TypeTask) =>
              userId == input.id &&
              input.task !== '' && (
                <li
                  key={input.nanoId}
                  data-nanoid={input.nanoId}
                  className={styles.taskItem}
                >
                  {' '}
                  <Link to={`/${userId}/tasks/${input.nanoId}`}>
                    <h3>{input.task}</h3>
                    <p>{input.description}</p>
                  </Link>
                  <div className={styles.buttons}>
                    <Link to={`/${userId}/tasks/editTask/${input.nanoId}`}>
                      <button type="button">Edit</button>
                    </Link>
                    <button onClick={handleDeletedTask} type="button">
                      Delete
                    </button>
                  </div>
                </li>
              )
          )}
        </ul>
      ) : (
        <p>Нет задач</p>
      )}
    </div>
  );
};

export default Tasks;
