import { useParams } from 'react-router-dom';
import { getAllTimesTasksStorage } from '../../../utils/forStorage';
import { FC, useEffect, useState } from 'react';
import { TypeTime } from '../../../utils/types';
import { getAllTimes } from '../../../utils/getAllTimes';

const AllTimeTasks: FC = () => {
  const { userId } = useParams<string>();
  const [allTimes, setAllTimes] = useState<TypeTime[]>([]);

  useEffect(() => {
    const init = async () => {
      setAllTimes(await getAllTimesTasksStorage(userId));
    };
    init();
  }, []);
  const { hours, minutes, seconds } = getAllTimes(allTimes);

  return (
    <>
      {allTimes.length > 0 ? (
        <div>
          {hours < 10 ? '0' + hours : hours}:
          {minutes < 10 ? '0' + minutes : minutes}:
          {seconds < 10 ? '0' + seconds : seconds}
        </div>
      ) : (
        <p>00:00:00</p>
      )}
    </>
  );
};

export default AllTimeTasks;
