import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getTasksStorage,
  deletedTaskStorage,
  deletedTimeStorage,
} from '../../../utils/forStorage';
import { TypeTask } from '../FormTasks/FormTasks';
import Task from '../../simple/Task/Task';
import AllTimeTasks from '../../simple/AllTimeTasks/AllTimeTasks';
type Props = {
  input: TypeTask;
};
const Tasks: FC<Props> = (props: Props) => {
  const [tasks, setTasks] = useState<TypeTask[]>();
  const { userId } = useParams<string>();
  useEffect(() => {
    const init = async () => {
      setTasks(await getTasksStorage());
    };
    init();
  }, [props.input]);

  const handleDeletedTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const li = e.currentTarget.parentNode?.parentNode as HTMLLIElement;
    const taskId = li.dataset.taskid;
    await deletedTaskStorage(taskId);
    await deletedTimeStorage(taskId as string);
    setTasks(await getTasksStorage());
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1>Задачи:</h1>
        <div className="flex gap-x-2">
          <p>Общее время:</p>
          <AllTimeTasks />
        </div>
      </div>
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
