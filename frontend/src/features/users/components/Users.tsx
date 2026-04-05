import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { TypeUser } from '../../../types/types';
import Search from '@/features/users/components/Search';
import { Colors } from '@/styles/colors';
import { useGetUsers } from '../hooks/useGetUsers';
import { useSearchStore } from '../store/useSearch.store';

const Users = () => {
  const { data: users, isError, isPending } = useGetUsers();
  const { setUsers, getFilteredUsers } = useSearchStore();

  useEffect(() => {
    setUsers(users ?? []);
  }, [setUsers, users]);

  return isPending ? (
    <ClipLoader
      color={Colors.BlueL}
      size={50}
      speedMultiplier={1}
      className="mx-auto mt-5"
    />
  ) : isError ? (
    <p className="m-5 text-lg">Ошибка загрузки пользователей</p>
  ) : (
    <div className="w-full p-4">
      <Search />
      <ul>
        {getFilteredUsers().map((user: TypeUser) => (
          <li className="border-b py-1.5" key={user._id}>
            <Link to={`/${user.userId}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
