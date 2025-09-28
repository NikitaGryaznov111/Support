import { FC, useEffect, useState } from 'react';
import { TypeUser } from '../../../utils/types';
import Users from '../../simple/Users/Users';
import Sidebar from '../../simple/Sidebar/Sidebar';
import AuthServices from '../../../api/AuthServices';
import styles from './MainPage.module.scss';

const MainPage: FC = () => {
  const [users, setUsers] = useState<TypeUser[]>();

  useEffect(() => {
    const loadUsers = async (): Promise<void> => {
      const data = await AuthServices.getUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);
  return (
    <div className="flex">
      <Sidebar />
      {users ? (
        <Users users={users} />
      ) : (
        <p className={styles.loadUsers}>Загрузка всех пользователей...</p>
      )}
    </div>
  );
};

export default MainPage;
