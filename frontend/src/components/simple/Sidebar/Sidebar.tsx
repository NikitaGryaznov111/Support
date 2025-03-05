import { NavLink } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import Logout from '../../smart/Auth/Logout';

const Sidebar: FC = () => {
  const [userId, setUserId] = useState<String>();
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUserId(userId);
    }
  }, []);
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
        </nav>
      </div>
      <Logout />
    </div>
  );
};

export default Sidebar;
