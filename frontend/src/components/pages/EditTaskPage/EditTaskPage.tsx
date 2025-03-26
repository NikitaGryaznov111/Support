import { FC, useActionState, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StorageTasks } from '../../../utils/forStorage';
import { TypeTask, TypeFormData } from '../../../utils/types';
import Sidebar from '../../simple/Sidebar/Sidebar';
import Form from '../../UI/Form/Form';

const EditTaskPage: FC = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState<TypeTask>();
  const { taskId, userId } = useParams();
  const [state, formAction] = useActionState<TypeTask>(handleSubmit as any, {
    taskName: '',
    description: '',
  });

  useEffect(() => {
    const init = async () => {
      setTask(await StorageTasks.getTask(taskId));
    };
    init();
  }, []);
  // БУДЕТ ЮЗЭФФЕКТ, КОТОРЫЙ БУДЕТ ПОЛУЧАТЬ ID ПРОЕКТА
  async function handleSubmit(prevState: TypeTask, formData: TypeFormData) {
    const updates: TypeTask = {
      taskName: formData.get('taskName'),
      description: formData.get('description'),
    };
    await StorageTasks.updateTask(taskId, updates);
    navigate(`/${userId}/tasks`);
  }
  return (
    <div className="flex ">
      <Sidebar />
      {task && (
        <Form
          formAction={formAction}
          defaultValueName={task.taskName}
          defaultValueDescription={task.description}
          text={'Редактировать'}
        ></Form>
      )}
    </div>
  );
};

export default EditTaskPage;
