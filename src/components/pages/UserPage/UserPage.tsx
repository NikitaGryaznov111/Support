import { FC } from 'react';
import { Link, Outlet, useLoaderData, useParams } from 'react-router-dom';
import { getUserStorage } from '../../../forStorage';
import { User } from '../../../api/getUsers';
import Button from '../../UI/Button';
export type UserId = {
  params: {
    userId: string;
  };
};
export const loader = async ({ params }: UserId) => {
  const { userId } = params;
  const user = (await getUserStorage(userId)) as User;
  return user;
};
const UserPage: FC = () => {
  const user = useLoaderData() as User;
  const { userId } = useParams();
  const { name } = user;
  return (
    <div className="container pt-2 px-4 my-0 mx-auto">
      {!user ? (
        <p>Загрузка пользователя с id:{userId}</p>
      ) : (
        <>
          <div className="flex justify-between items-center justify-center">
            <h1>{name}</h1>
            <Button>Закрыть</Button>
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
