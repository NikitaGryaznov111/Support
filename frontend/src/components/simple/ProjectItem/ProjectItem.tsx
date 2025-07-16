import { Link } from 'react-router-dom';
import Checkbox from '../../UI/Checkbox/Checkbox';
import styles from './ProjectItem.module.scss';
import Button from '../../UI/Button/Button';
import React, { FC } from 'react';
import { TypeProject } from '../../../utils/types';

interface IProjectItemProps {
  checkedAll: boolean;
  userId: string | undefined;
  index: number;
  project: TypeProject;
  projectId: string;
  handleDeletedProject: (e: string) => Promise<void>;
}
const ProjectItem: FC<IProjectItemProps> = ({
  checkedAll,
  userId,
  index,
  project,
  projectId,
  handleDeletedProject,
}) => {
  const { name } = project;
  console.log('render ProjectItem');
  return (
    <li data-projectid={projectId} className={styles.projectItem}>
      <Checkbox checkedAll={checkedAll} />
      <Link to={`/${userId}/projects/${projectId}`} className={styles.taskLink}>
        <span>{index + 1}. </span>
        <span className={styles.projectName}>{name}</span>
      </Link>
      <div className={styles.buttons}>
        <Link to={`/${userId}/projects/editProject/${projectId}`}>
          <Button>Изменить</Button>
        </Link>
        <Button onClick={() => handleDeletedProject(projectId)}>Удалить</Button>
      </div>
    </li>
  );
};

export default React.memo(ProjectItem);
