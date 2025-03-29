import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TypeProject } from '../../../utils/types';
import {
  StorageProjects,
  StorageTasks,
  StorageTimeTask,
} from '../../../utils/forStorage';
import styles from './ProjectsPage.module.scss';
import Button from '../../UI/Button/Button';

// ДОБАВЬ КНОПКИ И СДЕЛАЙ ЧЕКБОКСЫ
const ProjectsPage: FC = () => {
  const [projects, setProjects] = useState<TypeProject[]>();
  const { userId } = useParams();
  useEffect(() => {
    const init = async () => {
      setProjects(await StorageProjects.getProjects());
    };
    init();
  }, []);
  // const handleDeletedTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const li = (e.target as HTMLButtonElement).closest('li') as HTMLLIElement;
  //   const taskId = li.dataset.taskid;
  //   await StorageTasks.deletedTask(taskId);
  //   await StorageTimeTask.deletedTime(taskId);
  // };
  return (
    <>
      {projects ? (
        <ul>
          {projects.map((project, index) => {
            const { projectId, name } = project;
            return (
              <li key={projectId} className={styles.projectItem}>
                <Link to={`/${userId}/projects/${projectId}`}>
                  <span>{index + 1}. </span>
                  <span className={styles.projectName}>{name}</span>
                </Link>
                {/* <div className={styles.buttons}>
                  <Link to={`/${userId}/projects/editProject/${projectId}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button onClick={handleDeletedTask}>Delete</Button>
                </div> */}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Нет добавленных проектов</p>
      )}
    </>
  );
};

export default ProjectsPage;
