import { useState } from 'react';
import { StorageTotalSeconds } from '../utils/storage/storageTotalSeconds';

const usePersistentTimer = () => {
  const [start, setStart] = useState<number>();

  const saveStartTimerStorage = async (taskId: string, projectId: string) => {
    if (!projectId) {
      await StorageTotalSeconds.addStartTime(Date.now(), taskId);
    } else {
      await StorageTotalSeconds.addStartTimeFromProject(Date.now(), taskId);
    }
  };
  const getStartTimerStorage = async (taskId: string, projectId: string) => {
    if (!projectId) {
      const startTime = await StorageTotalSeconds.findStartTime(taskId);
      setStart(startTime);
      return startTime;
    } else {
      const startTime = await StorageTotalSeconds.findStartTimeFromProject(
        taskId
      );
      setStart(startTime);
      return startTime;
    }
  };

  const getTimeAfterStart = (dateNow: number) => {
    if (!start) {
      return 0;
    } else {
      return Math.floor(dateNow / 1000 - start);
    }
  };
  const resetStartTimerStorage = async (taskId: string, projectId: string) => {
    if (!projectId) {
      await StorageTotalSeconds.resetStartTime(taskId);
    } else {
      await StorageTotalSeconds.resetStartTimeFromProject(taskId);
    }
  };

  return {
    saveStartTimerStorage,
    getTimeAfterStart,
    getStartTimerStorage,
    resetStartTimerStorage,
  };
};

export default usePersistentTimer;
