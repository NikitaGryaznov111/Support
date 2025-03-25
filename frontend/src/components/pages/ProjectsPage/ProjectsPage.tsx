import { useEffect, useState } from 'react';
import { TypeProject } from '../../../utils/types';
import styles from './ProjectsPage.module.scss';
import { StorageProjects } from '../../../utils/forStorage';

const ProjectsPage = () => {
  const [projects, setProjects] = useState<TypeProject[]>();

  useEffect(() => {
    const init = async () => {
      setProjects(await StorageProjects.getProjects());
    };
    init();
  }, []);
  console.log(projects);
  return (
    <>
      {projects ? (
        <ul>
          {projects.map((project) => {
            return <li key={project.projectId}>{project.name}</li>;
          })}
        </ul>
      ) : (
        <p>Нет добавленных проектов</p>
      )}
    </>
  );
};

export default ProjectsPage;
