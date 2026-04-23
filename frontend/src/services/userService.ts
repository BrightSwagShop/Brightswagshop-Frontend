import api from "../API/api";

export type UserResponse = {
  id: string;
  username: string;
  favorites: string[];
};

export type LoginResponse = {
  user: UserResponse;
  token: string;
};

export async function login(username: string, password: string) {
  const response = await api.post<LoginResponse>("/api/users/login", {
    username,
    password,
  });

  return response.data;
}

export async function register(username: string, password: string) {
  const response = await api.post<UserResponse>("/api/users/register", {
    username,
    password,
});

  return response.data;
}

export async function getMe() {
  const response = await api.get<UserResponse>("/api/users/me");
  return response.data;
}

export async function addFavorite(productId: string) {
  const response = await api.post<UserResponse>("/api/users/favoriteToevoegen", {
    productId,
  });

  return response.data;
}

export async function removeFavorite(productId: string) {
  const response = await api.post<UserResponse>("/api/users/favoriteVerwijderen", {
    productId,
  });

  return response.data;
}