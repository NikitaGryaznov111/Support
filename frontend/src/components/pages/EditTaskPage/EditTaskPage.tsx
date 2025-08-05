import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TypePath, TypeTask } from '../../../utils/types';
import Sidebar from '../../simple/Sidebar/Sidebar';
import Form from '../../UI/Form/Form';
import { StorageProjects } from '../../../utils/storage/storageProjects';
import { StorageTasks } from '../../../utils/storage/storageTasks';
// РАЗБЕРИСЬ, ПУСТОЕ ИМЯ И ОПИСАНИЕ ЗАДАЧИ!!!
const EditTaskPage: FC = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState<TypeTask>();
  const [taskName, setTaskName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
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
    setTaskName(updates.taskName);
    setDescription(updates.description);
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
          valueName={taskName}
          valueDescription={description}
          text={'Редактировать'}
          onChangeTaskName={(e: ChangeEvent<HTMLInputElement>) =>
            setTaskName(e.target.value)
          }
          onChangeDescription={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        ></Form>
      )}
    </div>
  );
};

export default EditTaskPage;
