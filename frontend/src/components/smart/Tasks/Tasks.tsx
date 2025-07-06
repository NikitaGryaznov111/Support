import { SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TypeTask } from '../../../utils/types';
import Task from '../../simple/Task/Task';
import AllTimeTasks from '../../simple/AllTimeTasks/AllTimeTasks';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';
import { MyContext } from '../../../routes/MyContext';
import getCheckedTask from './Tasks.helpers';
import { StorageTasks } from '../../../utils/storage/storageTasks';
import { StorageTimeTask } from '../../../utils/storage/storageTimeTask';

const Tasks = (props: { task: TypeTask[] }) => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [selectedTasksProject, setSelectedTasksProject] = useState<TypeTask[]>(
    []
  );
  const [tasks, setTasks] = useState<TypeTask[]>();
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const { userId } = useParams<string>();
  const listTask = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const init = async () => {
      setTasks(await StorageTasks.getTasksUser(userId));
      if (!tasks) return;
      if (tasks.length) setCheckedAll(false);
    };
    init();
  }, [props.task, userId]);

  const setAppStyles = useContext(MyContext);

  const handleDeletedCheckedTask = async (): Promise<void> => {
    const checkedTask = getCheckedTask(listTask);
    if (!checkedTask) return;
    for (const { taskId } of checkedTask) {
      await StorageTasks.deletedTask(taskId);
      await StorageTimeTask.deletedTime(taskId);
    }
    setTasks(await StorageTasks.getTasksUser(userId));
  };

  const handleOpenModal = () => {
    const checkedTask = getCheckedTask(listTask);
    if (!checkedTask) return;
    if (checkedTask.length > 0) {
      setAppStyles('AppModal');
      setModalActive(!modalActive);
      setSelectedTasksProject(checkedTask as SetStateAction<TypeTask[]>);
    }
  };

  const updateTasks = async () => {
    setTasks(await StorageTasks.getTasksUser(userId));
  };
  const closeModal = () => {
    setAppStyles('');
    setModalActive(!modalActive);
  };
  return (
    <>
      {tasks?.length ? (
        <div className="mt-6">
          <div className="flex justify-between mb-6">
            <span>Задачи:</span>
            <div className="flex gap-x-2">
              <span>Общее время:</span>
              <AllTimeTasks />
            </div>
          </div>
          <>
            <input
              type="checkbox"
              onChange={() => setCheckedAll(!checkedAll)}
            />{' '}
            Все
            <ul ref={listTask} className="mb-4">
              {tasks?.map((task: TypeTask, index: number) => (
                <Task
                  key={task.taskId}
                  task={task}
                  userId={userId}
                  index={index}
                  checkedAll={checkedAll}
                  updateTasks={updateTasks}
                />
              ))}
            </ul>
            <Button onClick={handleDeletedCheckedTask}>Удалить задачи</Button>
            <Button onClick={handleOpenModal}>Добавить задачи в проект</Button>
          </>
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
