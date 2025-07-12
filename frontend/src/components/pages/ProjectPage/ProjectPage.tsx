import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../simple/Sidebar/Sidebar';
import { TypePath, TypeProject } from '../../../utils/types';
import Button from '../../UI/Button/Button';
import Task from '../../simple/Task/Task';
import styles from './ProjectPage.module.scss';
import { StorageProjects } from '../../../utils/storage/storageProjects';

const ProjectPage = () => {
  const [project, setProject] = useState<TypeProject | null>(null);
  const { userId, projectId } = useParams<TypePath>();

  const tasks = project?.tasks;

  const loadProject = useCallback(async () => {
    if (projectId) {
      try {
        setProject(await StorageProjects.getProject(projectId));
      } catch (error) {
        console.error('Ошибка загрузки проекта:', error);
        setProject(null);
      }
    }
  }, [projectId]);
  useEffect(() => {
    loadProject();
  }, [projectId]);
  return (
    <div className="flex">
      <Sidebar />
      <div className={styles.projectPage}>
        <div className={styles.projectPageHeader}>
          {!project ? <p>Проект не найден</p> : <h1>{project.name}</h1>}
          <Link to={'/'}>
            <Button>Закрыть</Button>
          </Link>
        </div>
        {!tasks || tasks.length === 0 ? (
          <p>Задачи отсутствуют</p>
        ) : (
          <ul>
            <p className="text-base mb-[15px]">Задачи:</p>
            {tasks.map((task, index) => {
              return (
                <Task
                  key={task.taskId}
                  task={task}
                  userId={userId}
                  index={index}
                  projectId={projectId}
                  loadProject={loadProject}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
