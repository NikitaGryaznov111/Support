import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import { TypeCurrentProjects } from '../../../utils/types';
import { StorageProjects } from '../../../utils/forStorage';

import styles from './CurrentProjects.module.scss';

const CurrentProjects: FC<TypeCurrentProjects> = ({
  close,
  projects,
  selectedTasksProject,
  setSwitchCurrentProject,
  setSwitcher,
}) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const addTask = async (projectId: string): Promise<void> => {
    await StorageProjects.addTasksInProject(projectId, selectedTasksProject);
    navigate(`/${userId}/projects/${projectId}`);
    close();
  };
  const actionSwitch = (): void => {
    setSwitchCurrentProject(false);
    setSwitcher(true);
  };
  return (
    <>
      {projects && (
        <div className={styles.modalActive}>
          <button
            className={styles.btnBack}
            onClick={actionSwitch}
            title="Назад"
          ></button>
          <ul className={styles.listProjects}>
            {projects.map((project, index) => {
              const { projectId, name } = project;
              return (
                <li
                  className={styles.itemProjects}
                  key={projectId}
                  onClick={() => {
                    addTask(projectId);
                  }}
                >
                  <span>{index + 1}.</span>
                  <span> {name}</span>
                </li>
              );
            })}
          </ul>
          <Button onClick={close}>Закрыть</Button>
        </div>
      )}
    </>
  );
};

export default CurrentProjects;
