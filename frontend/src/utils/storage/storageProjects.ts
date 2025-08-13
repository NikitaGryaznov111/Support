import localforage from 'localforage';
import { TypeProject, TypeTask } from '../types';

export abstract class StorageProjects {
  static async getProjectsUser(userId: string): Promise<TypeProject[]> {
    const projects = await localforage.getItem<TypeProject[]>('projects');
    if (!projects) return [];
    const projectsUser = projects.filter(
      (project) => project.userId === userId
    );
    return projectsUser;
  }
  static async addProject(project: TypeProject): Promise<void> {
    const projects = await localforage.getItem<TypeProject[]>('projects');

    if (projects) {
      await localforage.setItem('projects', [...projects, project]);
    } else {
      await localforage.setItem('projects', [project]);
    }
  }
  static async getProject(projectId: string): Promise<TypeProject> {
    const projects = await localforage.getItem<TypeProject[]>('projects');
    const project = projects!.find(
      (project) => project.projectId === projectId
    );
    if (!project) throw new Error('Проект не найден');
    return project;
  }
  static async getTasks(projectId: string): Promise<TypeTask[]> {
    const project = await this.getProject(projectId);
    const { tasks } = project;
    return tasks;
  }
  static async getTask(projectId: string, taskId: string): Promise<TypeTask> {
    const project = await this.getProject(projectId);
    const { tasks } = project;
    const task = tasks.find((task) => task.taskId === taskId);
    return task as TypeTask;
  }
  static async updateTask(
    taskId: string,
    projectId: string,
    updates: TypeTask
  ): Promise<TypeTask> {
    const projects = await localforage.getItem<TypeProject[]>('projects');
    const project = projects!.find(
      (project) => project.projectId === projectId
    );
    const { tasks } = project as TypeProject;

    const task = tasks.find((task) => task.taskId === taskId);
    Object.assign(task!, updates);
    await localforage.setItem('projects', projects);
    return task as TypeTask;
  }
  static async deletedTask(projectId: string, taskId: string) {
    const projects = await localforage.getItem<TypeProject[]>('projects');
    if (!projects) return [];
    const project = projects.find((project) => project.projectId === projectId);
    const { tasks } = project as TypeProject;
    const undeletedTasks = tasks.filter((task) => task.taskId !== taskId);
    project!.tasks = undeletedTasks;
    await localforage.setItem('projects', projects);
  }

  static async addTasksInProject(
    projectId: string,
    selectedTasksProject: TypeTask[]
  ): Promise<void> {
    const projects = await localforage.getItem<TypeProject[]>('projects');
    const project = projects!.find(
      (project) => project.projectId === projectId
    );
    const { tasks } = project as TypeProject;
    tasks.push(...selectedTasksProject);
    await localforage.setItem('projects', projects);
  }
  static async deletedProject(projectId: string): Promise<void> {
    const projects = await localforage.getItem<TypeProject[]>('projects');
    const newProjects = projects!.filter(
      (project) => project.projectId !== projectId
    );
    await localforage.setItem('projects', newProjects);
  }

  static async updateProject(
    projectId: TypeProject['projectId'],
    updates: { name: string }
  ) {
    try {
      const projects = await localforage.getItem<TypeProject[]>('projects');
      if (!projects) throw new Error('Проекты не найдены в хранилище');
      const index = projects.findIndex((proj) => proj.projectId === projectId);
      if (index === -1) throw new Error(`Проект c id ${projectId} не найден`);
      const { name } = updates;
      projects[index].name = name;
      await localforage.setItem('projects', projects);
    } catch (error) {
      console.error('Ошибка при обновлении проекта:', error);
    }
  }
}
