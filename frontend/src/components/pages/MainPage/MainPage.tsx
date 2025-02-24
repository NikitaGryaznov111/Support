import { FC, useEffect, useState } from 'react';
import { TypeUser } from '../../../utils/types';
import Users from '../../simple/Users/Users';
import { addUsersStorage, getUsersStorage } from '../../../utils/forStorage';
import Sidebar from '../../simple/Sidebar/Sidebar';

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
    <div className="flex">
      <Sidebar />
      {users ? <Users users={users} /> : <p>Заргузка пользователей...</p>}
    </div>
  );
};

export default MainPage;
