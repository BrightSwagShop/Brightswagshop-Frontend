import { fetchWithAuth } from "./adminApi";

export type User = {
  id: string;
  username: string;
  favorites: string[];
};

export const getUsers = async (): Promise<User[]> => {
  const res = await fetchWithAuth("/api/users/all");
  return res.data as User[];
};
