import { useActionState } from 'react';
import Sidebar from '../../simple/Sidebar/Sidebar';
import Button from '../../UI/Button/Button';
import styles from '../../UI/Form/Form.module.scss';
import { TypeFormData } from '../../../utils/types';
import { useNavigate, useParams } from 'react-router-dom';
import { StorageProjects } from '../../../utils/storage/storageProjects';

const EditProjectPage = () => {
  const [state, formAction] = useActionState(handleForm as any, {
    name: '',
  });
  const { projectId, userId } = useParams();
  const navigate = useNavigate();
  async function handleForm(
    prevState: { name: string },
    formData: TypeFormData
  ): Promise<void> {
    const newName = formData.get('projectName');
    if (newName === '') {
      alert('Введите новое название проекта');
    } else {
      const updates = {
        name: newName,
      };
      await StorageProjects.updateProject(projectId!, updates);
      navigate(`/${userId}/projects`);
    }
  }
  return (
    <div className="flex">
      <Sidebar />
      <form className={styles.form} action={formAction}>
        <label className={styles.label} htmlFor="project">
          Название проекта:
        </label>
        <input
          className={`${styles.input} mt-3 mb-3`}
          type="text"
          id="project"
          placeholder="Name project..."
          name="projectName"
        />
        <Button children="Редактировать" type="submit" />
        <Button
          children="Отменить"
          type="button"
          onClick={() => navigate(`/${userId}/projects`)}
        />
      </form>
      {/* <Link to={'/'}>
        <Button>Закрыть</Button>
      </Link> */}
    </div>
  );
};

export default EditProjectPage;
