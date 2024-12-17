import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TypeTask } from '../../smart/FormTasks/FormTasks';
import {
  getTaskStorage,
  addTimeStorage,
  getTimeStorage,
} from '../../../forStorage';
import Button from '../../UI/Button';
import styles from './TaskPage.module.scss';
export type TypeTime = {
  hours: number;
  minutes: number;
  seconds: number;
  taskId?: string;
};

const TaskPage: FC = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState<TypeTask>();
  const timerRef = useRef() as { current: number };
  const btnRef = useRef() as any;
  const [time, setTime] = useState<TypeTime>({
    hours: 0,
    minutes: 3,
    seconds: 0,
    taskId,
  });

  useEffect(() => {
    const init = async () => {
      setTask(await getTaskStorage(taskId));
    };
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      if (time.seconds === 0) {
        const data = (await getTimeStorage(taskId)) as TypeTime;
        setTime(data);
      }
    };
    init();
  }, []);
  useEffect(() => {
    const init = async () => {
      await addTimeStorage(time, taskId);
    };
    init();
  }, [time]);
  const handleBtnStartTime: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    btnRef.current.disabled = true;
    timerRef.current = await setInterval(() => {
      setTime((prevTime) => ({
        hours: prevTime.hours + Math.floor(prevTime.seconds / 3600),
        minutes: prevTime.minutes + Math.floor((prevTime.seconds % 3600) / 59),
        seconds: (prevTime.seconds % 59) + 1,
        taskId,
      }));
    }, 1000);
  };
  const handleBtnStopTime: React.MouseEventHandler<HTMLButtonElement> = () => {
    clearInterval(timerRef.current);
    btnRef.current.disabled = false;
  };
  const { hours, minutes, seconds } = time;
  return (
    <div className={styles.taskWrapper}>
      {' '}
      <div>
        <h3>{task?.task}</h3>
        <p>{task?.description}</p>
      </div>
      <button onClick={handleBtnStartTime} ref={btnRef}>
        Start
      </button>
      <button onClick={handleBtnStopTime}>Stop</button>
      {time ? (
        <div>
          {hours < 10 ? '0' + hours : hours}:
          {minutes < 10 ? '0' + minutes : minutes}:
          {seconds < 10 ? '0' + seconds : seconds}
        </div>
      ) : (
        <p>00:00:00</p>
      )}
    </div>
  );
};

export default TaskPage;
