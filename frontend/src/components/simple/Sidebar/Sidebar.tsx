import { NavLink, useParams } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { FC } from 'react';
import { TypePath, TypeUser } from '../../../utils/types';
import AuthServices from '../../../api/AuthServices';

const getUser = async (): Promise<TypeUser> => {
  return await AuthServices.getUser();
};
const Sidebar: FC = () => {
  // надо будет получить юзера из бд и получить потом его userId
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
            to={'/2'}
          >
            Моя страница
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${styles.active}` : '')}
            to={'/2/tasks'}
          >
            Мои задачи
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
