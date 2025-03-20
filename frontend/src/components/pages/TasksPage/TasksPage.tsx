import { FC, useActionState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { StorageTasks } from '../../../utils/forStorage';
import Tasks from '../../smart/Tasks/Tasks';
import Form from '../../UI/Form/Form';
import { TypeTask } from '../../../utils/types';

type TypeFormData = {
  get: (name: string) => string;
};
const TasksPage: FC = () => {
  const nanoId = nanoid(6);
  const { userId } = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState<TypeTask>(handleBtnClick as any, {
    task: '',
    description: '',
    id: userId,
    taskId: nanoId,
  });

  async function handleBtnClick(prevState: TypeTask, formData: TypeFormData) {
    if (formData.get('task') === '') {
      alert('Введите название задачи!');
      return;
    }
    const newTask = {
      task: formData.get('task'),
      description: formData.get('description'),
      id: userId,
      taskId: nanoId,
    };
    const tasks = await StorageTasks.getTasksStorage();
    await StorageTasks.addTasks(newTask, tasks as TypeTask[]);
    formRef.current?.reset();
    return newTask;
  }
  return (
    <div className="[&>form]:p-0 mb-1.5">
      <Form formAction={formAction} text="Добавить задачу"></Form>
      <Tasks state={state} />
    </div>
  );
};

export default TasksPage;
