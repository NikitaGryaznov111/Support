import { FC, useActionState, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StorageProjects, StorageTasks } from '../../../utils/forStorage';
import { TypeTask, TypeFormData } from '../../../utils/types';
import Sidebar from '../../simple/Sidebar/Sidebar';
import Form from '../../UI/Form/Form';

const EditTaskPage: FC = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState<TypeTask>();
  const { taskId, userId, projectId } = useParams();
  const [state, formAction] = useActionState<TypeTask>(handleSubmit as any, {
    taskName: '',
    description: '',
  });

  useEffect(() => {
    const init = async () => {
      if (projectId) {
        setTask(await StorageProjects.getTask(projectId!, taskId!));
      } else {
        setTask(await StorageTasks.getTask(taskId));
      }
    };
    init();
  }, []);
  async function handleSubmit(prevState: TypeTask, formData: TypeFormData) {
    const updates: TypeTask = {
      taskName: formData.get('taskName'),
      description: formData.get('description'),
    };
    if (projectId) {
      await StorageProjects.updateTask(taskId!, projectId!, updates);
      navigate(`/${userId}/projects/${projectId}`);
    } else {
      await StorageTasks.updateTask(taskId, updates);
      navigate(`/${userId}/tasks`);
    }
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
