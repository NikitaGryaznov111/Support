import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { addTask } from '../../../store/parts/tasksSlice';
import { useParams } from 'react-router-dom';
export type TypeTasks = {
  task: string;
  description: string;
  id?: string;
};
const FormTasks: FC = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const [input, setInput] = useState<TypeTasks>({
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

  const handleBtnClick = () => {
    if (input.task === '') {
      alert('Введите название задачи!');
      return;
    }
    dispatch(addTask(input));
    setInput({ task: '', description: '' });
  };
  return (
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
  );
};

export default FormTasks;
