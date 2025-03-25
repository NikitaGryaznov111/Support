import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../simple/Sidebar/Sidebar';
import {
  StorageProjects,
  StorageTasks,
  StorageTimeTask,
} from '../../../utils/forStorage';
import { TypeProject } from '../../../utils/types';
import Button from '../../UI/Button/Button';
import styles from './ProjectPage.module.scss';
const ProjectPage = () => {
  const [project, setProject] = useState<TypeProject>();
  const { userId, projectId } = useParams();

  const tasks = project?.tasks;
  useEffect(() => {
    const init = async () => {
      setProject(await StorageProjects.getProject(projectId!));
    };
    init();
  }, []);
  const handleDeletedTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const li = (e.target as HTMLButtonElement).closest('li') as HTMLLIElement;
    const taskId = li.dataset.taskid;
    await StorageTasks.deletedTask(taskId);
    await StorageTimeTask.deletedTime(taskId);
  };
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <h1> {project?.name}</h1>
        <ul>
          {tasks?.map((task) => {
            const { taskId, taskName, description } = task;
            return (
              <li key={taskId}>
                <Link to={`/${userId}/tasks/${taskId}`}>
                  <h2>{taskName}</h2>
                  <p>{description}</p>
                </Link>
                <div className={styles.buttons}>
                  <Link to={`/${userId}/tasks/editTask/${taskId}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button onClick={handleDeletedTask}>Delete</Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProjectPage;
