import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../simple/Sidebar/Sidebar';
import { StorageProjects } from '../../../utils/forStorage';
import { TypeProject } from '../../../utils/types';
import Button from '../../UI/Button/Button';
import Task from '../../simple/Task/Task';
import styles from './ProjectPage.module.scss';
const ProjectPage = () => {
  const [project, setProject] = useState<TypeProject>();
  const [toggle, setToggle] = useState<boolean>(true);
  const { userId, projectId } = useParams();
  const updateToggle = () => setToggle(!toggle);

  const tasks = project?.tasks;
  useEffect(() => {
    const init = async () => {
      setProject(await StorageProjects.getProject(projectId!));
    };
    init();
  }, [toggle]);

  return (
    <div className="flex">
      <Sidebar />
      <div className={styles.projectPage}>
        <div className={styles.projectPageHeader}>
          <h1> {project?.name}</h1>
          <Link to={'/'}>
            <Button>Закрыть</Button>
          </Link>
        </div>
        {tasks ? (
          <ul>
            <p className="text-base mb-[15px]">Задачи:</p>
            {tasks?.map((task, index) => {
              return (
                <Task
                  key={task.taskId}
                  task={task}
                  userId={userId}
                  index={index}
                  projectId={projectId}
                  updateToggle={updateToggle}
                />
              );
            })}
          </ul>
        ) : (
          <p>Задач нет</p>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
