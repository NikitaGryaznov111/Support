import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addTasksStorage, getTasksStorage } from '../../../forStorage';
import Tasks from '../Tasks/Tasks';
export type TypeTask = {
  task: string;
  description: string;
  id?: string;
};
const FormTasks: FC = () => {
  const { userId } = useParams();
  const [input, setInput] = useState<TypeTask>({
    task: '',
    description: '',
    id: userId,
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

  const handleBtnClick = async () => {
    if (input.task === '') {
      alert('Введите название задачи!');
      return;
    }
    const tasks = await getTasksStorage();
    addTasksStorage(input, tasks);
    setInput({ task: '', description: '', id: userId });
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
        <button type="button" onClick={handleBtnClick}>
          Добавить задачу
        </button>
      </form>
      <Tasks input={input} />
    </>
  );
};

export default FormTasks;
