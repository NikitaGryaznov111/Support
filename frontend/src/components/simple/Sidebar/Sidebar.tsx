import { NavLink, useNavigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes/routes.config';

const Sidebar: FC = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string>();
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUserId(userId);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    navigate(ROUTES.registration);
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.sideBar}>
        <h1 className={styles.sideBarHeader}>Support</h1>
        <nav className={styles.sideBarNav}>
          <NavLink
            className={({ isActive }) => (isActive ? `${styles.active}` : '')}
            to={'/'}
          >
            Все пользователи
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${styles.active}` : '')}
            end={true}
            to={`/${userId}`}
          >
            Моя страница
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${styles.active}` : '')}
            to={`/${userId}/tasks`}
          >
            Мои задачи
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${styles.active}` : '')}
            to={`/${userId}/projects`}
          >
            Мои проекты
          </NavLink>
        </nav>
      </div>
      <Button className="fixed bottom-0" onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  );
};

export default Sidebar;
