import { FC, useActionState, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StorageTasks } from '../../../utils/forStorage';
import { TypeTask, TypeFormData } from '../../../utils/types';
import Sidebar from '../../simple/Sidebar/Sidebar';
import Form from '../../UI/Form/Form';

const EditTaskPage: FC = () => {
  const navigate = useNavigate();
  const [task, setInput] = useState<TypeTask>();
  const { editTaskId, userId } = useParams();
  const [state, formAction] = useActionState<TypeTask>(handleSubmit as any, {
    task: '',
    description: '',
  });

  useEffect(() => {
    const init = async () => {
      setInput(await StorageTasks.getTask(editTaskId));
    };
    init();
  }, []);

  async function handleSubmit(prevState: TypeTask, formData: TypeFormData) {
    const updates: TypeTask = {
      task: formData.get('task'),
      description: formData.get('description'),
    };
    await StorageTasks.updateTask(editTaskId, updates);
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
