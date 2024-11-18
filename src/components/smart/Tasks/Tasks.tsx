import { nanoid } from 'nanoid';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTasksStorage } from '../../../forStorage';
import { TypeTask } from '../FormTasks/FormTasks';

type Props = {
  input: TypeTask;
};
const Tasks: FC<Props> = (props: Props) => {
  const [tasks, setTasks] = useState<TypeTask[]>();
  const { userId } = useParams();

  useEffect(() => {
    const init = async () => {
      setTasks(await getTasksStorage());
    };
    init();
  }, [props.input]);

  return (
    <div>
      <h1>Задачи:</h1>
      {tasks ? (
        <ul>
          {tasks.map(
            (input: TypeTask) =>
              userId == input.id &&
              input.task !== '' && (
                <li key={nanoid()}>
                  <h3>{input.task}</h3>
                  <p>{input.description}</p>
                </li>
              )
          )}
        </ul>
      ) : (
        <p>Нет задач</p>
      )}
    </div>
  );
};

export default Tasks;
