import axios from "axios";
import { getApiBaseUrl } from "../Config/apiBaseUrl";

export type CartItemRequest = {
  productId: string;
  selectedColor?: string;
  quantity: number;
};

export type CartItemResponse = {
  productId: string;
  productName: string;
  selectedColor?: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string;
};

export type ShoppingCartResponse = {
  id: string;
  userId?: string;
  sessionId?: string;
  totalPrice: number;
  updatedAt: string;
  items: CartItemResponse[];
};

// baseUrl voor shoppingCarts
const api = axios.create({
  baseURL: `${getApiBaseUrl()}/api/shoppingcarts`,
});

export const getCartByUserId = async (
  userId: string,
): Promise<ShoppingCartResponse> => {
  const response = await api.get<ShoppingCartResponse>(`/user/${userId}`);
  return response.data;
};

export const updateCartItemQuantity = async (
  userId: string,
  request: CartItemRequest,
): Promise<ShoppingCartResponse> => {
  const response = await api.put<ShoppingCartResponse>(
    `/user/${userId}/quantity`,
    request,
  );
  return response.data;
};

export const removeCartItem = async (
  userId: string,
  request: CartItemRequest,
): Promise<ShoppingCartResponse> => {
  const response = await api.delete<ShoppingCartResponse>(
    `/user/${userId}/item`,
    {
      data: request,
    },
  );
  return response.data;
};

export const addCartItem = async (
  userId: string,
  request: CartItemRequest,
): Promise<ShoppingCartResponse> => {
  const response = await api.post<ShoppingCartResponse>(
    `/user/${userId}/items`,
    request,
  );
  return response.data;
};
