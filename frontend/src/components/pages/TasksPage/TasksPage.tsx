import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import Tasks from '../../smart/Tasks/Tasks';
import Form from '../../UI/Form/Form';
import { TypeTask } from '../../../utils/types';
import { StorageTasks } from '../../../utils/storage/storageTasks';

const TasksPage: FC = () => {
  const { userId } = useParams();
  const [task, setTask] = useState<TypeTask[]>([]);

  async function handleBtnClick(formData: FormData): Promise<void> {
    const taskName = formData.get('taskName') as string;
    const description = formData.get('description') as string;
    if (!taskName.trim()) {
      alert('Введите название задачи!');
      return;
    }
    const newTask = {
      taskName,
      description,
      id: userId,
      taskId: nanoid(6),
    };
    await StorageTasks.addTasks(newTask);
    setTask(() => [newTask]);
  }
  return (
    <div className="[&>form]:p-0 mb-1.5">
      <Form formAction={handleBtnClick} text="Добавить задачу"></Form>
      <Tasks task={task} />
    </div>
  );
};

export default TasksPage;
