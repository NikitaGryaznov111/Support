export type TypeTask = {
  task: string;
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
  checkedAll: boolean;
  updateToggle: () => void;
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
  loader?: () => any;
  action?: () => any;
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
  tasks: Array<HTMLLIElement>;
};

export type TypePropsModal = {
  modalActive: boolean;
  selectedTasksProject: HTMLLIElement[];
  closeModal: () => void;
};

export type TypeFormData = {
  get: (name: string) => string;
};
