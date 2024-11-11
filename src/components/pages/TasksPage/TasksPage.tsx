import { FC } from 'react';
import FormTasks from '../../smart/FormTasks/FormTasks';
import Tasks from '../../smart/Tasks/Tasks';
const TasksPage: FC = () => {
  return (
    <>
      <FormTasks />
      <Tasks />
    </>
  );
};

export default TasksPage;
