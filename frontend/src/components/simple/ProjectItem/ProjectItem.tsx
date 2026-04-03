import { Link } from 'react-router-dom';
import React from 'react';
import Checkbox from '../../ui/Checkbox/Checkbox';
import Button from '../../ui/Button/Button';
import { TypeProject } from '../../../types/types';
import styles from './ProjectItem.module.scss';

interface IProps {
  checkedAll: boolean;
  userId: string | undefined;
  index: number;
  project: TypeProject;
  projectId: string;
  handleDeletedProject: (projectId: string) => Promise<void>;
}
const ProjectItem = ({
  checkedAll,
  userId,
  index,
  project,
  projectId,
  handleDeletedProject,
}: IProps) => {
  const { name } = project;
  return (
    <li data-projectid={projectId} className={styles.projectItem}>
      <Checkbox checkedAll={checkedAll} />
      <Link
        to={`/${userId ?? 'unknown'}/projects/${projectId}`}
        className={styles.taskLink}
      >
        <span>{index + 1}. </span>
        <span className={styles.projectName}>{name}</span>
      </Link>
      <div className={styles.buttons}>
        <Button to={`/${userId}/projects/${projectId}/edit`} as="link">
          Изменить
        </Button>
        <Button onClick={() => handleDeletedProject(projectId)}>Удалить</Button>
      </div>
    </li>
  );
};

export default React.memo(ProjectItem);
