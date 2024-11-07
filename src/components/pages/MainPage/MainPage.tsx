import { FC } from 'react';
import { User } from '../../../api/getUsers';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { addUsersStorage, getUsersStorage } from '../../../forStorage';

export type UserStorage = {
  users: Promise<User[]>;
};
export const loader = async () => {
  addUsersStorage();
  const users = (await getUsersStorage()) as Promise<User[]>;
  return { users };
};

const MainPage: FC = () => {
  const { users }: any = useLoaderData();
  {
    return (
      <div>
        <h1>Main Page</h1>
        {users.length ? (
          <ul>
            {users.map((user: User) => (
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
  }
};

export default MainPage;
