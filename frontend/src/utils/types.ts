import { ChangeEvent } from 'react';
import { ActionFunction, LoaderFunction } from 'react-router-dom';

export type TypeTask = {
  taskName: string;
  description: string;
  id?: string;
  taskId?: string;
};
export type TypeTime = {
  totalSeconds: number;
  taskId?: string;
  projectId?: string | null;
  userId?: string;
};
export type TypeUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  userId: string;
};

export type TypeTaskProps = {
  task: TypeTask;
  index: number;
  userId: string | undefined;
  checkedAll: boolean;
  loadProject?: () => void;
  loadTasks?: () => void;
  projectId?: string;
};

export type TypePropsForm = {
  formAction: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  valueName?: string;
  valueDescription?: string;
  text: string;
  onChangeTaskName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type TypeRoutesConfig = {
  path: string;
  element: React.ReactElement;
  loader?: LoaderFunction;
  action?: ActionFunction;
  children?: TypeRoutesConfig[];
  errorElement?: React.ReactElement;
};
export type TypePath = {
  userId?: string;
  editTaskId?: string;
  taskId?: string;
  projectId?: string;
};

export type TypeAuthUser = {
  accessToken: string;
  user: TypeUser;
  validPassword?: boolean;
};

export type TypeProject = {
  name: string;
  projectId: string;
  userId?: string;
  tasks: Array<TypeTask>;
};

export type TypePropsModal = {
  modalActive: boolean;
  selectedTasksProject: TypeTask[];
  closeModal: () => void;
};

export type TypeFormData = {
  get: (name: string) => string;
};
