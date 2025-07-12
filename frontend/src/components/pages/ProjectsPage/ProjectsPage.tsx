import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TypeProject } from '../../../utils/types';
import styles from './ProjectsPage.module.scss';
import Button from '../../UI/Button/Button';
import { StorageProjects } from '../../../utils/storage/storageProjects';
import Checkbox from '../../UI/Checkbox/Checkbox';

// ДОБАВЬ КНОПКИ И СДЕЛАЙ ЧЕКБОКСЫ
const ProjectsPage: FC = () => {
  const [projects, setProjects] = useState<TypeProject[]>();
  const [toggle, setToggle] = useState<boolean>(false);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
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
        <div>
          {' '}
          <input
            type="checkbox"
            onChange={() => setCheckedAll(!checkedAll)}
            className={styles.checkboxAll}
          />{' '}
          Выбрать все проекты
          <ul>
            {projects.map((project, index) => {
              const { projectId, name } = project;
              return (
                <li
                  data-projectid={projectId}
                  key={projectId}
                  className={styles.projectItem}
                >
                  <Checkbox checkedAll={checkedAll} />
                  <Link
                    to={`/${userId}/projects/${projectId}`}
                    className={styles.taskLink}
                  >
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
        </div>
      ) : (
        <p>Нет добавленных проектов</p>
      )}
    </>
  );
};

export default ProjectsPage;
