import { FC, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { TypeUser } from '../../../types/types';
import Button from '../../ui/Button/Button';
import Sidebar from '../../simple/Sidebar/Sidebar';
import { getUser } from './UserPage.helpers';
import styles from './UserPage.module.scss';
const UserPage: FC = () => {
  const [user, setUser] = useState<TypeUser>();
  const { userId } = useParams<string>();
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    const init = async () => {
      try {
        if (userId) setUser(await getUser(userId));
        setError(false);
      } catch (error) {
        console.error('Failed to load user:', error);
        setError(true);
      } finally {
        setLoad(false);
      }
    };
    init();
  }, [userId]);
  return (
    <div className="flex">
      <Sidebar />
      {load ? (
        <p className={styles.loadUser}>Загрузка страницы...</p>
      ) : error ? (
        <p className={styles.errorUser}>
          Ошибка получения информации о пользователе{' '}
        </p>
      ) : user ? (
        <div className={styles.userPage}>
          <div className={styles.userPageHeader}>
            <h1>{user.name}</h1>
            <Button to="/" as="link">
              Закрыть
            </Button>
          </div>
          <div className={styles.navLinks}>
            <Button to="projects" as="navLink">
              Проекты
            </Button>
            <Button to="tasks" as="navLink">
              Задачи
            </Button>
          </div>
          <Outlet />
        </div>
      ) : (
        <p className={styles.notUser}>Пользователь не найден {'('}</p>
      )}
    </div>
  );
};

export default UserPage;
