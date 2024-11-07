import { FC, useState } from 'react';
type FormTasks = {
  task: string;
  description: string;
};
const FormTasks: FC = () => {
  const [input, setInput] = useState<FormTasks>({
    task: '',
    description: '',
  });

  return (
    <form>
      <label htmlFor="task">Название задачи:</label>
      <input value={input.task} type="text" id="task" />
      <label htmlFor="description">Описание задачи:</label>
      <input value={input.description} type="text" id="description" />
      <button type="button">Добавить задачу</button>
    </form>
  );
};

export default FormTasks;
