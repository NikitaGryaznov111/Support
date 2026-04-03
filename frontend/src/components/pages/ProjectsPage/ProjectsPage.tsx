import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TypePath, TypeProject } from '../../../types/types';
import Button from '../../ui/Button/Button';
import { StorageProjects } from '../../../utils/storage/storageProjects';
import CheckboxAll from '../../ui/CheckboxAll/CheckboxAll';
import getCheckedProjects from './ProjectsPage.helpers';
import ProjectItem from '../../simple/ProjectItem/ProjectItem';
import { StorageTimeTask } from '../../../utils/storage/storageTimeTask';
const ProjectsPage: FC = () => {
  const [projects, setProjects] = useState<TypeProject[]>();
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const { userId } = useParams<TypePath>();
  const listProjects = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const init = async () => {
      try {
        if (userId) setProjects(await StorageProjects.getProjectsUser(userId));
      } catch (error) {
        console.error('Ошибка получения проектов пользователя:', error);
      }
    };
    init();
  }, [userId]);

  const handleCheckboxAll = (): void => {
    setCheckedAll(!checkedAll);
  };

  const handleDeletedProject = useCallback(async (projectId: string) => {
    await StorageTimeTask.delTimeWhenDelProject([projectId]);
    await StorageProjects.deletedProject(projectId);
    setProjects((prev) => prev?.filter((p) => p.projectId !== projectId));
  }, []);

  const handleDeletedCheckedProject = useCallback(async () => {
    const checkedProjects = getCheckedProjects(listProjects);
    if (!checkedProjects) return;
    const projectIds = checkedProjects.map((p) => p.projectId);
    await StorageTimeTask.delTimeWhenDelProject(projectIds);
    for (const projectId of projectIds) {
      await StorageProjects.deletedProject(projectId);
    }
    setProjects(
      (prev) => prev?.filter((p) => !projectIds.includes(p.projectId)) || [],
    );
  }, []);
  return (
    <>
      {projects?.length ? (
        <div>
          <CheckboxAll
            handleCheckboxAll={handleCheckboxAll}
            text="Выбрать все проекты"
          />
          <ul ref={listProjects}>
            {projects.map((project, index) => {
              return (
                <ProjectItem
                  key={project.projectId}
                  project={project}
                  index={index}
                  userId={userId}
                  checkedAll={checkedAll}
                  projectId={project.projectId}
                  handleDeletedProject={handleDeletedProject}
                />
              );
            })}
          </ul>
          <Button onClick={handleDeletedCheckedProject}>Удалить проекты</Button>
        </div>
      ) : (
        <p>Нет добавленных проектов</p>
      )}
    </>
  );
};

export default ProjectsPage;
