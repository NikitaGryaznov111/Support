import { ClipLoader } from 'react-spinners';
import Sidebar from '../../simple/Sidebar/Sidebar';
import { Colors } from '../../../styles/colors';
import Users from '@/features/users/components/Users';
import { useGetUsers } from '@/features/users/hooks/useGetUsers';

const UsersPage = () => {
  const { data: users, isError, isPending } = useGetUsers();
  return (
    <div className="flex flex-row">
      <Sidebar />
      {isPending ? (
        <div className="mx-auto mt-5">
          <ClipLoader color={Colors.BlueL} size={50} speedMultiplier={1} />
        </div>
      ) : isError ? (
        <p className="m-5 text-lg">Ошибка загрузки пользователей</p>
      ) : (
        <Users users={users || []} />
      )}
    </div>
  );
};

export default UsersPage;
