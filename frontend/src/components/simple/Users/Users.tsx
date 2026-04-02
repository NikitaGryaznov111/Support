import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/store';
import { Link } from 'react-router-dom';
import { TypeUser } from '../../../types/types';
import Search from '../../smart/Search/Search';
import styles from './Users.module.scss';

interface TIProps {
  users: TypeUser[];
}
const Users = ({ users }: TIProps) => {
  const [filteredUsers, setFilteredUsers] = useState<TypeUser[]>([]);
  const searchUser = useAppSelector((state) => state.search);

  useEffect(() => {
    if (searchUser) {
      const newUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchUser.toLowerCase()),
      );
      setFilteredUsers(newUsers);
    } else {
      setFilteredUsers(users);
    }
  }, [searchUser, users]);
  return (
    <div className={styles.users}>
      <div className="flex justify-between">
        <h1>Список пользователей:</h1>
        <Search />
      </div>
      {!filteredUsers.length ? (
        <p className="text-xl">Данный пользователь не найден</p>
      ) : (
        <ul>
          {filteredUsers.map((user: TypeUser) => (
            <li className={styles.usersItem} key={user._id}>
              <Link to={`/${user.userId}`}>{user.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
