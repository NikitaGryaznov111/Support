import { FC } from 'react';
import { Link } from 'react-router-dom';
import { TypeUser } from '../../../utils/types';
import styles from './Users.module.scss';
type TypeUsersProps = {
  users: TypeUser[];
};

const Users: FC<TypeUsersProps> = ({ users }: TypeUsersProps) => {
  return (
    <div className={styles.users}>
      <h1>Список пользователей:</h1>
      <ul>
        {users.map((user: TypeUser) => (
          <li className={styles.usersItem} key={user.id}>
            <Link to={`/${user.id}`}>
              {user.id}. {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
