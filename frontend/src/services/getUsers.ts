// services/getUsers.ts

import { fetchWithAuth } from "./adminApi";


export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export const getUsers = async () => {
  const res = await fetchWithAuth("/users");
  return res.data as User[]; // manual cast because your fetch is untyped
};