import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TypeTask, TypeTime, TypePath } from '../../../types/types';
import Button from '../../ui/Button/Button';
import styles from './TaskPage.module.scss';
import useTimer from '../../../hooks/useTimer';
import { StorageProjects } from '../../../utils/storage/storageProjects';
import { StorageTasks } from '../../../utils/storage/storageTasks';
import { StorageTimeTask } from '../../../utils/storage/storageTimeTask';
import usePersistentTimer from '../../../hooks/usePersistentTimer';
import { StorageTotalSeconds } from '../../../utils/storage/storageTotalSeconds';

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

  const {
    saveStartTimerStorage,
    getTimeAfterStart,
    getStartTimerStorage,
    resetStartTimerStorage,
  } = usePersistentTimer();
  const [time, setTime] = useState<TypeTime>({
    totalSeconds,
    taskId,
    projectId,
    userId,
    timeStart: undefined,
  });
  useEffect(() => {
    if (!taskId) {
      console.error('ID задачи отсутствует!');
      return;
    }
    const loadTask = async () => {
      try {
        if (projectId) {
          setTask(await StorageProjects.getTask(projectId, taskId));
        } else {
          setTask(await StorageTasks.getTask(taskId));
        }
      } catch (error) {
        console.error('Ошибка загрузки задачи из хранилища:', error);
      }
    };

    const loadTime = async () => {
      try {
        if (!projectId) {
          const data = await StorageTimeTask.getTime(taskId);
          setTime(data);
        } else {
          const data = await StorageTimeTask.getTimeFromProject(taskId);
          setTime(data);
        }
      } catch (error) {
        console.error('Ошибка загрузки времени из хранилища:', error);
      }
    };
    loadTask();
    loadTime();
  }, []);

  useEffect(() => {
    const startPermTimer = async () => {
      try {
        const startTime = await getStartTimerStorage(taskId!, projectId!);
        if (startTime) {
          startTimer();
        }
      } catch (error) {
        console.error(
          'Ошибка загрузки времени нажатия на кнопку старт из хранилища:',
          error,
        );
      }
    };
    startPermTimer();
  }, []);

  useEffect(() => {
    const init = async () => {
      const timeAfterStart = getTimeAfterStart(Date.now());
      const timeStart = await getStartTimerStorage(taskId!, projectId!);
      const totalSecStartStorage = await StorageTotalSeconds.findTotalSeconds(
        taskId!,
        projectId!,
      );
      if (timeStart) {
        setTimeFromTotal(totalSecStartStorage + timeAfterStart);
      } else {
        setTimeFromTotal(time.totalSeconds);
      }
    };
    init();
  }, [time.timeStart]);

  // Слишком часто сохраняет, надо будет изменить! Через setTimeout?
  useEffect(() => {
    const saveTime = async () => {
      try {
        const dataToSave = {
          totalSeconds,
          taskId,
          projectId,
          userId,
          timeStart: await getStartTimerStorage(taskId!, projectId!),
        };
        await StorageTimeTask.addTime(dataToSave, taskId!);

        setTime(dataToSave);
      } catch (error) {
        console.error('Ошибка сохранения времени в хранилище:', error);
      }
    };
    saveTime();
  }, [totalSeconds]);

  const handleBtnStartTime: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      const totalSeconds = time.totalSeconds;
      await StorageTotalSeconds.saveTotalSeconds({
        totalSeconds,
        taskId,
        projectId,
      });
      saveStartTimerStorage(taskId!, projectId!);
      startTimer();
    } catch (error) {
      console.error('Ошибка при запуске таймера:', error);
    }
  };

  const handleBtnStopTime: React.MouseEventHandler<HTMLButtonElement> = () => {
    stopTimer();
    resetStartTimerStorage(taskId!, projectId!);
  };
  return (
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
        <Button onClick={handleBtnStopTime}>Stop</Button>
      </div>
    </div>
  );
};

export default TaskPage;
