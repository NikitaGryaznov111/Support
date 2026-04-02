import { useParams } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { TypeTime } from '../../../types/types';
import { getAllTimes } from '../../../utils/dateTime/getAllTimes';
import { StorageTimeTask } from '../../../utils/storage/storageTimeTask';

const AllTimeTasks: FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [allTimes, setAllTimes] = useState<TypeTime[]>([]);

  useEffect(() => {
    const init = async () => {
      setAllTimes(await StorageTimeTask.getFullTimeUser(userId));
    };
    init();
  }, [userId]);
  const totalSeconds = getAllTimes(allTimes);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
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
