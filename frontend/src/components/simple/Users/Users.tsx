import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TypeUser } from '../../../utils/types';
import styles from './Users.module.scss';
import Search from '../../smart/Search/Search';
import { useAppSelector } from '../../../store/store';
type TypeUsersProps = {
  users: TypeUser[];
};

const Users: FC<TypeUsersProps> = ({ users }: TypeUsersProps) => {
  const [filteredUsers, setFilteredUsers] = useState<TypeUser[]>();
  const search = useAppSelector((state) => state.search);

  useEffect(() => {
    if (search) {
      const newUsers = users.filter((user) =>
        user.name.toLowerCase().startsWith(search.toLowerCase())
      );
      setFilteredUsers(newUsers);
    } else {
      setFilteredUsers(users);
    }
  }, [search]);
  return (
    <div className={styles.users}>
      <div className="flex justify-between">
        <h1>Список пользователей:</h1>
        <Search />
      </div>

      {filteredUsers ? (
        <ul>
          {filteredUsers.map((user: TypeUser) => (
            <li className={styles.usersItem} key={user._id}>
              <Link to={`/${user.userId}`}>{user.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {users.map((user: TypeUser) => (
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
