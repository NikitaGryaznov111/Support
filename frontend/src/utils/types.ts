import { ActionFunction, LoaderFunction } from 'react-router-dom';

export type TypeTask = {
  taskName: string;
  description: string;
  id?: string;
  taskId?: string;
};
export type TypeTime = {
  hours: number;
  minutes: number;
  seconds: number;
  taskId?: string;
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
  userId: string | undefined;
  index: number;
  checkedAll?: boolean;
  updateToggle?: () => void;
  projectId?: string;
};

export type TypePropsForm = {
  formAction: () => void;
  defaultValueName?: string;
  defaultValueDescription?: string;
  text: string;
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
};

export type TypeAuthUser = {
  accessToken: string;
  user: TypeUser;
  validPassword?: boolean;
};

export type TypeProject = {
  name: string;
  projectId: string;
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
