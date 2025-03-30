import { FC, useState } from 'react';
import styles from './CurrentProjects.module.scss';
import Button from '../../UI/Button/Button';
import { TypeProject } from '../../../utils/types';
interface ICurrentProjects {
  modalActive: boolean;
  close: () => void;
  projects?: TypeProject[];
}
const CurrentProjects: FC<ICurrentProjects> = ({
  modalActive,
  close,
  projects,
}) => {
  return (
    <>
      {projects && (
        <ul className={modalActive ? styles.modalActive : styles.modal}>
          {projects.map((project) => {
            return <li key={project.projectId}>{project.name}</li>;
          })}
          <Button onClick={close}>Закрыть</Button>
        </ul>
      )}
    </>
  );
};

export default CurrentProjects;
