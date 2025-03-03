import { FC, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import { TypeUser } from '../../../utils/types';
import Button from '../../UI/Button/Button';
import Sidebar from '../../simple/Sidebar/Sidebar';
import styles from './UserPage.module.scss';
import AuthServices from '../../../api/AuthServices';

const getUser = async (userId: string): Promise<TypeUser> => {
  const users = await AuthServices.getUsers();
  return users.find(
    (person: TypeUser): boolean => person.userId === userId
  ) as TypeUser;
};
const UserPage: FC = () => {
  const [user, setUser] = useState<TypeUser>();
  const { userId } = useParams();

  useEffect(() => {
    const init = async () => {
      setUser(await getUser(userId as string));
    };
    init();
  }, [userId]);
  return (
    <div className="flex">
      <Sidebar />
      {!user ? (
        <p>Загрузка пользователя с id:{userId}</p>
      ) : (
        <div className={styles.userPage}>
          <div className={styles.userPageHeader}>
            <h1>{user.name}</h1>
            <Link to={'/'}>
              <Button>Закрыть</Button>
            </Link>
          </div>
          <Button>Проекты</Button>
          <NavLink
            className={({ isActive }) => (isActive ? `${styles.active}` : '')}
            to={`/${userId}/tasks`}
          >
            <Button>Задачи</Button>
          </NavLink>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default UserPage;
