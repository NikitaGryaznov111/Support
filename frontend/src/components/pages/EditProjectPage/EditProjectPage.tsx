import { useEffect, useState } from 'react';
import Button from '../../ui/Button/Button';
import { TypePath } from '../../../types/types';
import { useNavigate, useParams } from 'react-router-dom';
import { StorageProjects } from '../../../utils/storage/storageProjects';
import styles from '../../UI/Form/Form.module.scss';

const EditProjectPage = () => {
  const [value, setValue] = useState<string>('');
  const { projectId, userId } = useParams<TypePath>();
  const navigate = useNavigate();

  useEffect(() => {
    const getProjectName = async () => {
      if (projectId) {
        try {
          const project = await StorageProjects.getProject(projectId);
          setValue(project.name);
        } catch (error) {
          console.error('Ошибка загрузки проекта:', error);
        }
      }
    };
    getProjectName();
  }, [projectId]);

  async function handleForm(
    e: React.FormEvent<HTMLFormElement>,
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

      if (projectId) {
        await StorageProjects.updateProject(projectId, updates);
        navigate(`/${userId}/projects`);
      }
    }
  }

  return (
    <form className={styles.form} onSubmit={handleForm}>
      <div className="flex justify-between items-center">
        <label className={styles.label} htmlFor="project">
          Название проекта:
        </label>
        <Button to={`/${userId}/projects`} as="link">
          Закрыть
        </Button>
      </div>
      <input
        className={`${styles.input} mt-3 mb-3`}
        type="text"
        id="project"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="projectName"
      />
      <Button children="Редактировать" type="submit" />
      <Button
        children="Отменить"
        type="button"
        onClick={() => navigate(`/${userId}/projects`)}
      />
    </form>
  );
};

export default EditProjectPage;
