import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TypePath, TypeTask } from '../../../utils/types';
import Sidebar from '../../simple/Sidebar/Sidebar';
import Form from '../../UI/Form/Form';
import { StorageProjects } from '../../../utils/storage/storageProjects';
import { StorageTasks } from '../../../utils/storage/storageTasks';

const EditTaskPage: FC = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState<TypeTask>();
  const { taskId, userId, projectId } = useParams<TypePath>();

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
  async function handleForm(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updates = {
      taskName: formData.get('taskName'),
      description: formData.get('description'),
    } as TypeTask;
    console.log(updates.taskName);
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
          formAction={handleForm}
          defaultValueName={task.taskName}
          defaultValueDescription={task.description}
          text={'Редактировать'}
        ></Form>
      )}
    </div>
  );
};

export default EditTaskPage;
