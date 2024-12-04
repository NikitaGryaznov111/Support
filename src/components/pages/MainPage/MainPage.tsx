import { FC, useEffect, useState } from 'react';
import { TypeUser } from '../../../api/getUsers';
import { Link, Outlet } from 'react-router-dom';
import { addUsersStorage, getUsersStorage } from '../../../forStorage';

const MainPage: FC = () => {
  const [users, setUsers] = useState<TypeUser[]>();

  useEffect(() => {
    const init = async () => {
      addUsersStorage();
      setUsers(await getUsersStorage());
    };
    init();
  }, []);
  return (
    <div>
      <h1>Main Page</h1>
      {users ? (
        <ul>
          {users.map((user: TypeUser) => (
            <li key={user.id}>
              <Link to={`/${user.id}`}>{user.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Заргузка пользователей...</p>
      )}
      <Outlet />
    </div>
  );
};

export default MainPage;
