import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TypeTask, TypeTime } from '../../../utils/types';
import { StorageTasks, StorageTimeTask } from '../../../utils/forStorage';
import Sidebar from '../../simple/Sidebar/Sidebar';
import Button from '../../UI/Button/Button';
import styles from './TaskPage.module.scss';

const TaskPage: FC = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState<TypeTask>();
  const timerRef = useRef(null) as unknown as {
    current: number;
  };
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [time, setTime] = useState<TypeTime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    taskId,
  });

  useEffect(() => {
    const init = async () => {
      setTask(await StorageTasks.getTask(taskId));
    };
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      if (time.seconds === 0) {
        const data = (await StorageTimeTask.getTime(taskId)) as TypeTime;
        setTime(data);
      }
    };
    init();
  }, []);
  useEffect(() => {
    const init = async () => {
      await StorageTimeTask.addTime(time, taskId);
    };
    init();
  }, [time]);
  const handleBtnStartTime: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    btnRef.current!.disabled = true;
    timerRef.current = await setInterval(() => {
      setTime((prevTime) => ({
        hours:
          prevTime.seconds / 59 === 1
            ? prevTime.hours + Math.floor(prevTime.minutes / 59)
            : prevTime.hours,
        minutes: (prevTime.minutes + Math.floor(prevTime.seconds / 59)) % 60,
        seconds: (prevTime.seconds + 1) % 60,
        taskId,
      }));
    }, 1000);
  };
  const handleBtnStopTime: React.MouseEventHandler<HTMLButtonElement> = () => {
    clearInterval(timerRef.current);
    btnRef.current!.disabled = false;
  };
  const { hours, minutes, seconds } = time;
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
          <Button onClick={handleBtnStartTime} ref={btnRef}>
            Start
          </Button>
          <Button onClick={handleBtnStopTime}>Stop</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
