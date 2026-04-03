import axios from "axios";
import { TypeUser } from "../types/types";

export const getUsers = async (): Promise<TypeUser[]> => {
  return (await axios("http://localhost:5000/api/users")).data;
};
