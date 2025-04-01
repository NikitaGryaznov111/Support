import { FC, useState } from 'react';
import styles from './CurrentProjects.module.scss';
import Button from '../../UI/Button/Button';
import { TypeCurrentProjects } from '../../../utils/types';
import { StorageProjects } from '../../../utils/forStorage';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';

const CurrentProjects: FC<TypeCurrentProjects> = ({
  close,
  projects,
  selectedTasksProject,
}) => {
  const navigate: NavigateFunction = useNavigate();
  const { userId } = useParams();
  const addTask = async (projectId: string): Promise<void> => {
    await StorageProjects.addTasksInProject(projectId, selectedTasksProject);
    navigate(`/${userId}/projects/${projectId}`);
    close();
  };
  return (
    <>
      {projects && (
        <ul className={styles.modalActive}>
          {projects.map((project) => {
            const { projectId, name } = project;
            return (
              <li key={projectId}>
                <Button
                  onClick={() => {
                    addTask(projectId);
                  }}
                >
                  {name}
                </Button>
              </li>
            );
          })}
          <Button onClick={close}>Закрыть</Button>
        </ul>
      )}
    </>
  );
};

export default CurrentProjects;
