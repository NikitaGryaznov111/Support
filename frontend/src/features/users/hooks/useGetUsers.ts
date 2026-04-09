import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../services/getUsers.service';

export const useGetUsers = () => {
  const { data, isError, isPending, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000,
  });
  return { data, isError, isPending, error };
};
