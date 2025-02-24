import { FC, useActionState, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTaskStorage, updateTaskStorage } from '../../../utils/forStorage';
import { TypeTask } from '../../../utils/types';
import Sidebar from '../../simple/Sidebar/Sidebar';
import Form from '../../UI/Form/Form';
import { TypeTaskUpdate } from '../../../utils/types';
type TypeFormData = {
  get: (name: string) => string;
};

const EditTaskPage: FC = () => {
  const navigate = useNavigate();
  const [task, setInput] = useState<TypeTask>();
  const { editTaskId, userId } = useParams();
  const [state, formAction] = useActionState<TypeTaskUpdate>(
    handleSubmit as any,
    {
      task: '',
      description: '',
    }
  );

  useEffect(() => {
    const init = async () => {
      setInput(await getTaskStorage(editTaskId));
    };
    init();
  }, []);

  async function handleSubmit(
    prevState: TypeTaskUpdate,
    formData: TypeFormData
  ) {
    const updates: TypeTaskUpdate = {
      task: formData.get('task'),
      description: formData.get('description'),
    };
    await updateTaskStorage(editTaskId, updates);
    navigate(`/${userId}/tasks`);
  }
  return (
    <div className="flex ">
      <Sidebar />
      {task && (
        <Form
          formAction={formAction}
          defaultValueName={task.task}
          defaultValueDescription={task.description}
          text={'Редактировать'}
        ></Form>
      )}
    </div>
  );
};

export default EditTaskPage;
