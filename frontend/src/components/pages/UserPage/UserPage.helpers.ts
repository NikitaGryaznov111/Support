import AuthServices from '../../../api/AuthServices';
import { TypeUser } from '../../../utils/types';

export const getUser = async (userId: string): Promise<TypeUser> => {
  const users = await AuthServices.getUsers();
  const user = users.find(
    (person: TypeUser): boolean => person.userId === userId
  );
  if (!user) throw new Error('Данный пользователь не найден (');

  return user;
};
