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
// ПОДУМАЙ ГДЕ ОПТИМИЗИРОВАТЬ КОД МЕМО И ИТД
const ProjectsPage: FC = () => {
  const [projects, setProjects] = useState<TypeProject[]>();
  const [toggle, setToggle] = useState<boolean>(false);
  const { userId } = useParams();
  useEffect(() => {
    const init = async () => {
      setProjects(await StorageProjects.getProjectsUser(userId!));
    };
    init();
  }, [userId, toggle]);
  const handleDeletedProject = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const li = (e.target as HTMLButtonElement).closest('li');
    const projectId = li!.dataset.projectid;
    await StorageProjects.deletedProject(projectId!);
    setToggle(!toggle);
  };
  return (
    <>
      {projects?.length ? (
        <ul>
          {projects.map((project, index) => {
            const { projectId, name } = project;
            return (
              <li
                data-projectid={projectId}
                key={projectId}
                className={styles.projectItem}
              >
                <Link to={`/${userId}/projects/${projectId}`}>
                  <span>{index + 1}. </span>
                  <span className={styles.projectName}>{name}</span>
                </Link>
                <div className={styles.buttons}>
                  <Link to={`/${userId}/projects/editProject/${projectId}`}>
                    <Button>Изменить</Button>
                  </Link>
                  <Button onClick={handleDeletedProject}>Удалить</Button>
                </div>
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
