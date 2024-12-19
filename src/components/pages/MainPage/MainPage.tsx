import { FC, useEffect, useState } from 'react';
import { TypeUser } from '../../../api/getUsers';
import Users from '../../simple/Users/Users';
import { addUsersStorage, getUsersStorage } from '../../../utils/forStorage';

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
      {users ? <Users users={users} /> : <p>Заргузка пользователей...</p>}
    </div>
  );
};

export default MainPage;
