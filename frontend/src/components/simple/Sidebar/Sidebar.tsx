import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { FC } from 'react';
import { useAppSelector } from '../../../store/store';

const Sidebar: FC = () => {
  const userRegister = useAppSelector((state) => state.auth);
  const { user } = userRegister;

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
            to={`/${user.userId}`}
          >
            Моя страница
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${styles.active}` : '')}
            to={`/${user.userId}/tasks`}
          >
            Мои задачи
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
