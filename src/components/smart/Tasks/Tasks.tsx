import { nanoid } from 'nanoid';
import { FC } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { TypeTasks } from '../FormTasks/FormTasks';
import { useParams } from 'react-router-dom';

const Tasks: FC = () => {
  const selectedTask = useAppSelector((state) => state.tasks);
  const { userId } = useParams();

  return (
    <div>
      <h1>Задачи:</h1>
      <ul>
        {selectedTask.map(
          (input: TypeTasks) =>
            userId == input.id &&
            input.task !== '' && (
              <li key={nanoid()}>
                <h3>{input.task}</h3>
                <p>{input.description}</p>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Tasks;
