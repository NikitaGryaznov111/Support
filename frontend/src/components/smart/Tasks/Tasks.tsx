import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StorageTasks, StorageTimeTask } from '../../../utils/forStorage';
import { TypeTask } from '../../../utils/types';
import Task from '../../simple/Task/Task';
import AllTimeTasks from '../../simple/AllTimeTasks/AllTimeTasks';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';

const Tasks: FC<{ state: TypeTask }> = (props: { state: TypeTask }) => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [selectedTasksProject, setSelectedTasksProject] = useState<TypeTask[]>(
    []
  );
  const [tasks, setTasks] = useState<TypeTask[]>();
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const { userId } = useParams<string>();
  const [toggle, setToggle] = useState<boolean>(true);
  const listTask = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const init = async () => {
      if (!tasks?.length) setCheckedAll(false);
      setTasks(await StorageTasks.getTasksUser(userId));
    };
    init();
  }, [props.state]);
  useEffect(() => {
    const init = async () => {
      setTasks(await StorageTasks.getTasksUser(userId));
    };
    init();
  }, [toggle, userId]);

  // ДВЕ НИЖНИЕ ФУНКЦИИ ИМЕЮТ ПОХОЖИЙ КОД, ОПТИМИЗИРУЙ!!!

  const handleDeletedCheckedTask = async (): Promise<void> => {
    const ul = listTask.current;
    const inputs = ul?.getElementsByTagName('input');
    for (let input of inputs!) {
      const li = input.closest('li');
      const taskId = (li as HTMLLIElement).dataset.taskid;
      if (input.checked) {
        await StorageTasks.deletedTask(taskId);
        await StorageTimeTask.deletedTime(taskId as string);
      }
    }
    setTasks(await StorageTasks.getTasksUser(userId));
  };

  const handleOpenModal = () => {
    const arrDataTask = [];
    const ul = listTask.current;
    const inputs = ul?.getElementsByTagName('input');
    for (let input of inputs!) {
      const li = input.closest('li');
      const taskId = (li as HTMLLIElement).dataset.taskid;
      const taskName = li?.getElementsByTagName('span')[1].textContent;
      const description = li?.getElementsByTagName('p')[0].textContent;
      if (input.checked && li) {
        setModalActive(!modalActive);
        arrDataTask.push({ taskId, taskName, description });
      }
    }
    setSelectedTasksProject(arrDataTask as any);
  };
  const updateToggle = () => setToggle(!toggle);
  const closeModal = () => setModalActive(!modalActive);
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
            <Button onClick={handleOpenModal}>Добавить задачи в проект</Button>
          </form>
        </div>
      ) : (
        <p>Задачи отсутствуют!</p>
      )}
      <Modal
        modalActive={modalActive}
        selectedTasksProject={selectedTasksProject}
        closeModal={closeModal}
      />
    </>
  );
};

export default Tasks;
