import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TypePath, TypeProject } from '../../../utils/types';
import styles from './ProjectsPage.module.scss';
import Button from '../../UI/Button/Button';
import { StorageProjects } from '../../../utils/storage/storageProjects';
import Checkbox from '../../UI/Checkbox/Checkbox';
import CheckboxAll from '../../UI/CheckboxAll/CheckboxAll';

// ДОБАВЬ КНОПКУ УДАЛЕНИЯ ВЫБРАННЫХ ПРОЕКТОВ
const ProjectsPage: FC = () => {
  const [projects, setProjects] = useState<TypeProject[]>();
  const [toggle, setToggle] = useState<boolean>(false);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const { userId } = useParams<TypePath>();

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
  const handleCheckboxAll = (): void => {
    setCheckedAll(!checkedAll);
  };
  return (
    <>
      {projects?.length ? (
        <div>
          <CheckboxAll handleCheckboxAll={handleCheckboxAll} />
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
