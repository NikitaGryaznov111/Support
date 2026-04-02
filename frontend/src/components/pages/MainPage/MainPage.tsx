import { FC, useEffect, useState } from 'react';
import { TypeUser } from '../../../types/types';
import Users from '../../simple/Users/Users';
import Sidebar from '../../simple/Sidebar/Sidebar';
import AuthServices from '../../../api/AuthServices';
import styles from './MainPage.module.scss';
const MainPage: FC = () => {
  const [users, setUsers] = useState<TypeUser[]>();

  useEffect(() => {
    const init = async (): Promise<void> => {
      const data = await AuthServices.getUsers();
      setUsers(data);
    };
    init();
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
