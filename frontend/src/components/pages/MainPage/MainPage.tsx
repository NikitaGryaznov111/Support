import { FC, useEffect, useState } from 'react';
import { TypeUser } from '../../../utils/types';
import Users from '../../simple/Users/Users';
import Sidebar from '../../simple/Sidebar/Sidebar';
import AuthServices from '../../../api/AuthServices';

const MainPage: FC = () => {
  const [users, setUsers] = useState<TypeUser[]>();

  useEffect(() => {
    const init = async (): Promise<void> => {
      const data = await AuthServices.getUsers();
      setUsers(data);
    };
    init();
  }, []);
  console.log(users);
  return (
    <div className="flex">
      <Sidebar />
      {users ? <Users users={users} /> : <p>Заргузка пользователей...</p>}
    </div>
  );
};

export default MainPage;
