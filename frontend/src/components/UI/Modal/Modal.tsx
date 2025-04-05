import { FC, useEffect, useState } from 'react';
import { TypePropsModal, TypeProject } from '../../../utils/types';
import { StorageProjects } from '../../../utils/forStorage';
import CurrentProjects from '../../smart/CurrentProjects/CurrentProjects';
import AddingTasksProject from '../../simple/AddingTasksProject/AddingTasksProject';
import FormCreatingProject from '../../smart/FormCreatingProject/FormCreatingProject';
import { useParams } from 'react-router-dom';

const Modal: FC<TypePropsModal> = ({
  modalActive,
  selectedTasksProject,
  closeModal,
}: TypePropsModal) => {
  const [projects, setProjects] = useState<TypeProject[]>();
  const [switcher, setSwitcher] = useState<boolean>(true);
  const [switchCurrentProject, setSwitchCurrentProject] =
    useState<boolean>(false);
  const { userId } = useParams();
  useEffect(() => {
    const init = async (): Promise<void> => {
      setProjects(await StorageProjects.getProjectsUser(userId!));
    };
    init();
  }, []);
  const close = (): void => {
    closeModal();
    setSwitcher(true);
    setSwitchCurrentProject(false);
  };
  console.log(switcher);
  return (
    <>
      {switchCurrentProject ? (
        <CurrentProjects
          close={close}
          projects={projects}
          setSwitcher={setSwitcher}
          setSwitchCurrentProject={setSwitchCurrentProject}
          selectedTasksProject={selectedTasksProject}
        />
      ) : (
        <>
          {projects?.length && switcher ? (
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

export default Modal;
