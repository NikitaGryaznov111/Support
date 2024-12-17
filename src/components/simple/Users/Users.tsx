import { FC } from 'react';
import { Link } from 'react-router-dom';
import { TypeUser } from '../../../api/getUsers';

type TypeUsersProps = {
  users: TypeUser[];
};

const Users: FC<TypeUsersProps> = ({ users }: TypeUsersProps) => {
  return (
    <ul>
      {users.map((user: TypeUser) => (
        <li key={user.id}>
          <Link to={`/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Users;
