import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../simple/Sidebar/Sidebar';
import { TypePath, TypeProject, TypeTask } from '../../../utils/types';
import Button from '../../UI/Button/Button';
import Task from '../../simple/Task/Task';
import { StorageProjects } from '../../../utils/storage/storageProjects';
import getCheckedTask from '../../smart/Tasks/Tasks.helpers';
import CheckboxAll from '../../UI/CheckboxAll/CheckboxAll';
import { StorageTimeTask } from '../../../utils/storage/storageTimeTask';
import styles from './ProjectPage.module.scss';

const ProjectPage = () => {
  const [project, setProject] = useState<TypeProject | null>(null);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TypeTask[]>();
  const { userId, projectId } = useParams<TypePath>();
  const listTask = useRef<HTMLUListElement>(null);

  const loadProject = useCallback(async () => {
    if (projectId) {
      try {
        setProject(await StorageProjects.getProject(projectId));
      } catch (error) {
        console.error('Ошибка загрузки проекта:', error);
        setProject(null);
      }
    }
  }, [projectId]);

  const loadTasks = useCallback(async (): Promise<void> => {
    if (projectId) setTasks(await StorageProjects.getTasks(projectId));
  }, [projectId]);

  useEffect(() => {
    loadProject();
    loadTasks();
  }, [projectId]);

  const handleDeletedCheckedTask = async (): Promise<void> => {
    const checkedTask = getCheckedTask(listTask);
    if (!checkedTask || checkedTask.length === 0 || !projectId) return;
    for (const { taskId } of checkedTask) {
      await StorageProjects.deletedTask(projectId, taskId!);
      await StorageTimeTask.deletedTime(taskId, projectId);
    }
    await loadTasks();
  };

  const handleCheckboxAll = (): void => {
    setCheckedAll((prev) => !prev);
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className={styles.projectPage}>
        <div className={styles.projectPageHeader}>
          {!project ? <p>Проект не найден</p> : <h1>{project.name}</h1>}
          <Link to={'/'}>
            <Button>Закрыть</Button>
          </Link>
        </div>
        {!tasks || tasks.length === 0 ? (
          <p>Задачи отсутствуют</p>
        ) : (
          <>
            <CheckboxAll
              handleCheckboxAll={handleCheckboxAll}
              text="Выбрать все задачи"
            />

            <ul ref={listTask} className="mb-[14px]">
              <p className="text-base mb-[15px]">Задачи:</p>
              {tasks.map((task, index) => {
                return (
                  <Task
                    key={task.taskId}
                    task={task}
                    userId={userId}
                    index={index}
                    projectId={projectId}
                    loadProject={loadProject}
                    checkedAll={checkedAll}
                  />
                );
              })}
            </ul>
            <Button onClick={handleDeletedCheckedTask}>Удалить задачи</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
