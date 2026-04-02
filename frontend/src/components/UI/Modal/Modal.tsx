import React, { useEffect, useState } from 'react';
import { TypePropsModal, TypeProject, TypePath } from '../../../types/types';
import CurrentProjects from '../../smart/CurrentProjects/CurrentProjects';
import AddingTasksProject from '../../simple/AddingTasksProject/AddingTasksProject';
import FormCreatingProject from '../../smart/FormCreatingProject/FormCreatingProject';
import { useParams } from 'react-router-dom';
import { StorageProjects } from '../../../utils/storage/storageProjects';

const Modal = ({
  modalActive,
  selectedTasksProject,
  closeModal,
}: TypePropsModal) => {
  const [projects, setProjects] = useState<TypeProject[]>([]);
  const [switcher, setSwitcher] = useState<boolean>(true);
  const [switchCurrentProject, setSwitchCurrentProject] =
    useState<boolean>(false);
  const { userId } = useParams<TypePath>();

  useEffect(() => {
    const init = async (): Promise<void> => {
      if (userId) setProjects(await StorageProjects.getProjectsUser(userId));
    };
    init();
  }, [userId]);

  const close = (): void => {
    closeModal();
    setSwitcher(true);
    setSwitchCurrentProject(false);
  };
  return (
    <>
      {switchCurrentProject && projects ? (
        <CurrentProjects
          close={close}
          projects={projects}
          setSwitcher={setSwitcher}
          setSwitchCurrentProject={setSwitchCurrentProject}
          selectedTasksProject={selectedTasksProject}
        />
      ) : (
        <>
          {projects.length && switcher ? (
            <AddingTasksProject
              setSwitchCurrentProject={setSwitchCurrentProject}
              setSwitcher={setSwitcher}
              modalActive={modalActive}
              close={close}
            />
          ) : (
            <FormCreatingProject
              modalActive={modalActive}
              selectedTasksProject={selectedTasksProject}
              setSwitcher={setSwitcher}
              projects={projects}
              close={close}
            />
          )}
        </>
      )}
    </>
  );
};

export default React.memo(Modal);
