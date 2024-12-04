import { useEffect, useState } from 'react';
import { Form, redirect, useParams } from 'react-router-dom';
import { getTaskStorage, updateTaskStorage } from '../../../forStorage';
import { TypeTask } from '../../smart/FormTasks/FormTasks';
export type TypeTaskUpdate = Pick<TypeTask, 'task' | 'description'>;

export const action = async ({ request, params }: any): Promise<any> => {
  const { userId, editTaskId } = params;
  const formData = await request.formData();
  const updates = Object.fromEntries(formData) as TypeTaskUpdate;
  await updateTaskStorage(editTaskId, updates);
  return redirect(`/${userId}/tasks`);
};
const EditTaskPage = () => {
  const [input, setInput] = useState<TypeTask>();
  const { editTaskId } = useParams();
  console.log(editTaskId);
  useEffect(() => {
    const init = async () => {
      setInput(await getTaskStorage(editTaskId));
    };
    init();
  }, []);
  return (
    <div>
      {input ? (
        <Form method="post">
          <div>
            <span>Task:</span>
            <input
              type="text"
              name="task"
              className="border-solid border-2 border-sky-500"
              defaultValue={input.task}
            />
          </div>
          <div>
            <span>Description:</span>
            <input
              type="text"
              name="description"
              className="border-solid border-2 border-sky-500"
              defaultValue={input.description}
            />
          </div>
          <p>
            <button type="submit">Save</button>
          </p>
        </Form>
      ) : (
        <p>No</p>
      )}
    </div>
  );
};

export default EditTaskPage;
