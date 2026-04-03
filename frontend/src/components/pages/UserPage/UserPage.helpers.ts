import { useGetUsers } from "../../../hooks/useGetUsers";
import { TypeUser } from "../../../types/types";

export const getUser = async (userId: string): Promise<TypeUser> => {
  const { data: users } = useGetUsers();
  const user = users?.find(
    (person: TypeUser): boolean => person.userId === userId,
  );
  if (!user) throw new Error("Данный пользователь не найден (");

  return user;
};
