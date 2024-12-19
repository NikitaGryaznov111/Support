import { useParams } from 'react-router-dom';
import { getAllTimesTasksStorage } from '../../forStorage';
import { useEffect, useState } from 'react';
import { TypeTime } from '../pages/TaskPage/TaskPage';
const AllTimeTasks = () => {
  const { userId } = useParams<string>();
  const [allTimes, setAllTimes] = useState<TypeTime[]>([]);

  useEffect(() => {
    const init = async () => {
      if (!allTimes) {
        const times = await getAllTimesTasksStorage(userId);
        setAllTimes(times);
      }
    };
    init();
  }, []);
  console.log(allTimes);
  return <>00:00:00</>;
};

export default AllTimeTasks;
