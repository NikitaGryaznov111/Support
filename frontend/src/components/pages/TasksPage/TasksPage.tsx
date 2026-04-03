import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import Tasks from '../../smart/Tasks/Tasks';
import Form from '../../ui/Form/Form';
import { TypePath, TypeTask } from '../../../types/types';
import { StorageTasks } from '../../../utils/storage/storageTasks';

const TasksPage: FC = () => {
  const { userId } = useParams<TypePath>();
  const [task, setTask] = useState<TypeTask | null>(null);
  const [taskName, setTaskName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleBtnClick = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const getName = formData.get('taskName') as string;
    const getDescription = formData.get('description') as string;
    setTaskName(getName);
    setDescription(getDescription);
    if (!getName.trim()) {
      alert('Введите название задачи!');
      return;
    }
    const newTask: TypeTask = {
      taskName,
      description,
      id: userId,
      taskId: nanoid(6),
    };
    await StorageTasks.addTasks(newTask);
    setTask(newTask);
    setTaskName('');
    setDescription('');
  };

  return (
    <div className="[&>form]:p-0 mb-1.5">
      <Form
        formAction={handleBtnClick}
        text="Добавить задачу"
        onChangeTaskName={(e: ChangeEvent<HTMLInputElement>) =>
          setTaskName(e.target.value)
        }
        onChangeDescription={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        valueName={taskName}
        valueDescription={description}
      ></Form>
      <Tasks task={task} />
    </div>
  );
};

export default TasksPage;
