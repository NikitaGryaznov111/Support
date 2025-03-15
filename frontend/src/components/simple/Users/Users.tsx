import { FC } from 'react';
import { Link } from 'react-router-dom';
import { TypeUser } from '../../../utils/types';
import styles from './Users.module.scss';
import Search from '../../smart/Search/Search';
type TypeUsersProps = {
  users: TypeUser[];
};

const Users: FC<TypeUsersProps> = ({ users }: TypeUsersProps) => {
  return (
    <div className={styles.users}>
      <h1>Список пользователей:</h1>
      <ul>
        {users.map((user: TypeUser) => (
          <li className={styles.usersItem} key={user._id}>
            <Link to={`/${user.userId}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
      <Search />
    </div>
  );
};

export default Users;
