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
export type TypeUser = Partial<{
  id: string;
  name: string;
  email: string;
  adress: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}>;
export type TypeTaskUpdate = Pick<TypeTask, 'task' | 'description'>;

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

export type TYpeRoutesConfig = {
  path: string;
  element: React.ReactElement;
  loader?: () => any;
  action?: () => any;
  children?: TYpeRoutesConfig[];
  errorElement?: React.ReactElement;
};
