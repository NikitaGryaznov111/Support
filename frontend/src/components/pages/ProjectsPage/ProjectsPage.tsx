import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TypeProject } from '../../../utils/types';
import { StorageProjects } from '../../../utils/forStorage';
import styles from './ProjectsPage.module.scss';

const ProjectsPage = () => {
  const [projects, setProjects] = useState<TypeProject[]>();
  const { userId } = useParams();
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
            const { projectId, name } = project;
            return (
              <li key={projectId}>
                <Link to={`/${userId}/projects/${projectId}`}>{name}</Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Нет добавленных проектов</p>
      )}
    </>
  );
};

export default ProjectsPage;
