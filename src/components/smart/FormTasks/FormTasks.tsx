import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addTasksStorage, getTasksStorage } from '../../../utils/forStorage';
import Tasks from '../Tasks/Tasks';
import Button from '../../UI/Button';
import { nanoid } from 'nanoid';
export type TypeTask = {
  task: string;
  description: string;
  id?: string;
  taskId?: string;
};
const FormTasks: FC = () => {
  const nanoId = nanoid(6);
  const { userId } = useParams();
  const [input, setInput] = useState<TypeTask>({
    task: '',
    description: '',
    id: userId,
    taskId: nanoId,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'task') {
      setInput({ ...input, task: value });
    }
    if (id === 'description') {
      setInput({ ...input, description: value });
    }
  };

  const handleBtnClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    if (input.task === '') {
      alert('Введите название задачи!');
      return;
    }
    const tasks = await getTasksStorage();
    addTasksStorage(input, tasks);
    setInput({ task: '', description: '', id: userId, taskId: nanoId });
  };
  return (
    <>
      <form>
        <label htmlFor="task">Название задачи:</label>
        <input
          className="border-solid border-2 border-sky-500"
          value={input.task}
          type="text"
          id="task"
          onChange={handleInputChange}
        />
        <label htmlFor="description">Описание задачи:</label>
        <input
          className="border-solid border-2 border-sky-500"
          value={input.description}
          type="text"
          id="description"
          onChange={handleInputChange}
        />
        <Button onClick={handleBtnClick}>Добавить задачу</Button>
      </form>
      <Tasks input={input} />
    </>
  );
};

export default FormTasks;
