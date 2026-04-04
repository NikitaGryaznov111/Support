import { useGetUsers } from '../../../hooks/useGetUsers';
import { TypeUser } from '../../../types/types';

export const getUser = async (userId: string): Promise<TypeUser> => {
  // TODO Исправь !!!React Hook "useGetUsers" is called in function "getUser" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word "use".eslintreact-hooks/rules-of-hooks
  const { data: users } = useGetUsers();
  const user = users?.find(
    (person: TypeUser): boolean => person.userId === userId,
  );
  if (!user) throw new Error('Данный пользователь не найден (');

  return user;
};
