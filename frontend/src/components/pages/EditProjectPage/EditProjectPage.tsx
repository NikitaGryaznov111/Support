import Sidebar from '../../simple/Sidebar/Sidebar';
import Button from '../../UI/Button/Button';
import styles from '../../UI/Form/Form.module.scss';
import { TypePath } from '../../../utils/types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { StorageProjects } from '../../../utils/storage/storageProjects';

const EditProjectPage = () => {
  const { projectId, userId } = useParams<TypePath>();
  const navigate = useNavigate();

  async function handleForm(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newName = formData.get('projectName');

    if (newName === '') {
      alert('Введите новое название проекта');
    } else {
      const updates = {
        name: newName as string,
      };
      await StorageProjects.updateProject(projectId!, updates);
      navigate(`/${userId}/projects`);
    }
  }
  return (
    <div className="flex">
      <Sidebar />
      <form className={styles.form} onSubmit={handleForm}>
        <div className="flex justify-between items-center">
          <label className={styles.label} htmlFor="project">
            Название проекта:
          </label>
          <Link to={'/'}>
            <Button>Закрыть</Button>
          </Link>
        </div>
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
    </div>
  );
};

export default EditProjectPage;
