import { FC, useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { getUserStorage } from '../../../utils/forStorage';
import { TypeUser } from '../../../api/getUsers';
import Button from '../../UI/Button';
export type UserId = {
  params: {
    userId: string;
  };
};

const UserPage: FC = () => {
  const [user, setUser] = useState<TypeUser>();
  const { userId } = useParams();
  useEffect(() => {
    const init = async () => {
      setUser(await getUserStorage(userId));
    };
    init();
  }, []);

  return (
    <div>
      {!user ? (
        <p>Загрузка пользователя с id:{userId}</p>
      ) : (
        <>
          <div className="flex justify-between items-center justify-center">
            <h1>{user.name}</h1>
            <Link to={'/'}>
              <Button>Закрыть</Button>
            </Link>
          </div>
          <div>
            {/* <Button>Проекты</Button> */}
            <Link to={`/${userId}/tasks`}>
              <Button>Задачи</Button>
            </Link>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
