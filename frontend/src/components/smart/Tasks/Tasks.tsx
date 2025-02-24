import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getTasksUserStorage,
  deletedTaskStorage,
  deletedTimeStorage,
} from '../../../utils/forStorage';
import { TypeTask } from '../../../utils/types';
import Task from '../../simple/Task/Task';
import AllTimeTasks from '../../simple/AllTimeTasks/AllTimeTasks';
import Button from '../../UI/Button/Button';

const Tasks: FC<{ state: TypeTask }> = (props: { state: TypeTask }) => {
  const [tasks, setTasks] = useState<TypeTask[]>();
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const { userId } = useParams<string>();
  const [toggle, setToggle] = useState<boolean>(true);
  const listTask = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const init = async () => {
      if (!tasks?.length) setCheckedAll(false);
      setTasks(await getTasksUserStorage(userId));
    };
    init();
  }, [props.state]);
  useEffect(() => {
    const init = async () => {
      setTasks(await getTasksUserStorage(userId));
    };
    init();
  }, [toggle, userId]);

  const handleDeletedCheckedTask = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const ul = (e.target as HTMLButtonElement)
      .previousElementSibling as HTMLUListElement;
    const arrayLi: HTMLCollection = ul.children;
    for (let li of arrayLi) {
      const taskId = (li as HTMLLIElement).dataset.taskid;
      const inputChecked = li.firstChild as HTMLInputElement;
      if (inputChecked.checked) {
        await deletedTaskStorage(taskId);
        await deletedTimeStorage(taskId as string);
      }
    }
    setTasks(await getTasksUserStorage(userId));
  };
  const updateToggle = () => setToggle(!toggle);
  return (
    <>
      {tasks?.length ? (
        <div className="mt-4">
          <div className="flex justify-between">
            <span>Задачи:</span>
            <div className="flex gap-x-2">
              <p>Общее время:</p>
              <AllTimeTasks />
            </div>
          </div>
          <form>
            <label>
              <input
                type="checkbox"
                onChange={() => setCheckedAll(!checkedAll)}
              />{' '}
              Все
            </label>

            <ul ref={listTask} className="mb-4">
              {tasks?.map((task: TypeTask, index: number) => (
                <Task
                  key={task.taskId}
                  task={task}
                  userId={userId}
                  index={index}
                  checkedAll={checkedAll}
                  updateToggle={updateToggle}
                />
              ))}
            </ul>
            <Button onClick={handleDeletedCheckedTask}>Удалить задачи</Button>
          </form>
        </div>
      ) : (
        <p>Задачи отсутствуют!</p>
      )}
    </>
  );
};

export default Tasks;
