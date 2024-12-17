import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getTasksStorage,
  deletedTaskStorage,
  deletedTimeStorage,
} from '../../../forStorage';
import { TypeTask } from '../FormTasks/FormTasks';
import Task from '../../simple/Task/Task';
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

  const handleDeletedTask = async (
    e: React.MouseEvent<HTMLButtonElement> | any
  ) => {
    const li = e.currentTarget.parentNode?.parentNode;
    const taskId = li.dataset.taskid;
    await deletedTaskStorage(taskId);
    await deletedTimeStorage(taskId);
    setTasks(await getTasksStorage());
  };
  return (
    <div>
      <h1>Задачи:</h1>
      {tasks ? (
        <ul>
          {tasks.map(
            (task: TypeTask) =>
              userId == task.id &&
              task.task !== '' && (
                <Task
                  key={task.taskId}
                  task={task}
                  userId={userId}
                  onClick={handleDeletedTask}
                />
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
