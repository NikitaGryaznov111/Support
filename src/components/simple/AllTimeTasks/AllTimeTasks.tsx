import { useParams } from 'react-router-dom';
import { getAllTimesTasksStorage } from '../../../utils/forStorage';
import { useEffect, useState } from 'react';
import { TypeTime } from '../../pages/TaskPage/TaskPage';
import { getAllTimes } from '../../../utils/getAllTimes';

const AllTimeTasks = () => {
  const { userId } = useParams<string>();
  const [allTimes, setAllTimes] = useState<TypeTime[]>([]);

  useEffect(() => {
    const init = async () => {
      const times = await getAllTimesTasksStorage(userId);
      setAllTimes(times);
    };
    init();
  }, []);
  const a = getAllTimes(allTimes);
  console.log(a);
  return <>00:00:00</>;
};

export default AllTimeTasks;
