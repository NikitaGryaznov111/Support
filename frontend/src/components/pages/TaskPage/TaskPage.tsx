import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TypeTask, TypeTime, TypePath } from '../../../utils/types';
import Sidebar from '../../simple/Sidebar/Sidebar';
import Button from '../../UI/Button/Button';
import styles from './TaskPage.module.scss';
import useTimer from '../../../hooks/useTimer';
import { StorageProjects } from '../../../utils/storage/storageProjects';
import { StorageTasks } from '../../../utils/storage/storageTasks';
import { StorageTimeTask } from '../../../utils/storage/storageTimeTask';

const TaskPage: FC = () => {
  const { taskId, projectId, userId } = useParams<TypePath>();
  const [task, setTask] = useState<TypeTask>();
  const {
    hours,
    minutes,
    seconds,
    totalSeconds,
    startTimer,
    stopTimer,
    setTimeFromTotal,
    isRunning,
  } = useTimer();
  const [time, setTime] = useState<TypeTime>({
    totalSeconds,
    taskId,
    projectId,
  });
  useEffect(() => {
    const loadTask = async () => {
      try {
        if (projectId) {
          setTask(await StorageProjects.getTask(projectId!, taskId!));
        } else {
          setTask(await StorageTasks.getTask(taskId));
        }
      } catch (error) {
        console.error('Ошибка загрузки задачи:', error);
      }
    };

    const loadTime = async () => {
      if (!projectId) {
        const data = await StorageTimeTask.getTime(taskId);
        setTime(data);
      } else {
        const data = await StorageTimeTask.getTimeFromProject(taskId);
        setTime(data);
      }
    };

    loadTask();
    loadTime();
  }, []);

  useEffect(() => {
    if (time?.totalSeconds) setTimeFromTotal(time.totalSeconds);
  }, [time]);

  useEffect(() => {
    const saveTime = async () => {
      const dataToSave = {
        totalSeconds,
        taskId,
        projectId,
        userId,
      };
      await StorageTimeTask.addTime(dataToSave, taskId!);

      setTime(dataToSave);
    };
    saveTime();
  }, [totalSeconds]);

  const handleBtnStartTime: React.MouseEventHandler<HTMLButtonElement> = () => {
    startTimer();
  };
  const handleBtnStopTime: React.MouseEventHandler<HTMLButtonElement> = () => {
    stopTimer();
  };
  return (
    <div className="flex ">
      <Sidebar />
      <div className={styles.taskPage}>
        <div className={styles.taskPageHeader}>
          <div>
            <h3>{task?.taskName}</h3>
            <p>{task?.description}</p>
          </div>
          {time ? (
            <div className="font-bold">
              {hours < 10 ? '0' + hours : hours}:
              {minutes < 10 ? '0' + minutes : minutes}:
              {seconds < 10 ? '0' + seconds : seconds}
            </div>
          ) : (
            <p>00:00:00</p>
          )}
        </div>
        <div className={styles.taskPageButtons}>
          <Button onClick={handleBtnStartTime} disabled={isRunning}>
            Start
          </Button>
          <Button onClick={handleBtnStopTime} disabled={!isRunning}>
            Stop
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
