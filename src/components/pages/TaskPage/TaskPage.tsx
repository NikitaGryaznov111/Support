import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TypeTask } from '../../smart/FormTasks/FormTasks';
import {
  getTaskStorage,
  addTimeStorage,
  // getTimeStorage,
} from '../../../forStorage';
import styles from './TaskPage.module.scss';
export type TypeTime = {
  hours: number;
  minutes: number;
  seconds: number;
  taskId?: string;
};

const TaskPage = () => {
  const { taskId } = useParams();

  const [task, setTask] = useState<TypeTask>();
  const [time, setTime] = useState<TypeTime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    taskId,
  });
  const timerRef = useRef() as { current: number };
  const btnRef = useRef() as any;
  useEffect(() => {
    const init = async () => {
      setTask(await getTaskStorage(taskId));
    };
    init();
  }, []);
  useEffect(() => {
    const arr = addTimeStorage(time, taskId);
  }, [time]);
  const handleBtnStartTime = async () => {
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
  const handleBtnStopTime = () => {
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
      <div>
        {hours < 10 ? '0' + hours : hours}:
        {minutes < 10 ? '0' + minutes : minutes}:
        {seconds < 10 ? '0' + seconds : seconds}
      </div>
    </div>
  );
};

export default TaskPage;