import {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { TypePath, TypeTask } from '../../../utils/types';
import Task from '../../simple/Task/Task';
import AllTimeTasks from '../../simple/AllTimeTasks/AllTimeTasks';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';
import getCheckedTask from './Tasks.helpers';
import { StorageTasks } from '../../../utils/storage/storageTasks';
import { StorageTimeTask } from '../../../utils/storage/storageTimeTask';
import { MyContext } from '../../../context/appStylesContext';
import CheckboxAll from '../../UI/CheckboxAll/CheckboxAll';

// НАДО МЕМОИЗИРОВАТЬ МОДАЛКУ ПРИ КЛИКЕ НА "ВСЕ"
const Tasks = (props: { task: TypeTask | null }) => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [selectedTasksProject, setSelectedTasksProject] = useState<TypeTask[]>(
    []
  );
  const [tasks, setTasks] = useState<TypeTask[]>();
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const { userId } = useParams<TypePath>();
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

  const loadTasks = useCallback(async (): Promise<void> => {
    setTasks(await StorageTasks.getTasksUser(userId));
  }, [userId]);

  const closeModal = (): void => {
    setAppStyles('');
    setModalActive(!modalActive);
  };
  const handleCheckboxAll = (): void => {
    setCheckedAll(!checkedAll);
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
            <CheckboxAll handleCheckboxAll={handleCheckboxAll} />
            <ul ref={listTask} className="mb-4">
              {tasks?.map((task: TypeTask, index: number) => (
                <Task
                  key={task.taskId}
                  task={task}
                  userId={userId}
                  index={index}
                  checkedAll={checkedAll}
                  loadTasks={loadTasks}
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
