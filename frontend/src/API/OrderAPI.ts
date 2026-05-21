import axios from "axios";
import { getApiBaseUrl } from "../Config/apiBaseUrl";

export type OrderItemResponse = {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
};

export type OrderResponse = {
  id: string;
  userId: string;
  totalPrice: number;
  createdAt: string;
  status: string;
  paymentStatus: string;
  items: OrderItemResponse[];
};

const orderApi = axios.create({
  baseURL: `${getApiBaseUrl()}/api/orders`,
});

export const getAllOrders = async (): Promise<OrderResponse[]> => {
  const response = await orderApi.get<OrderResponse[]>("/");
  return response.data;
};

export const getOrderById = async (id: string): Promise<OrderResponse> => {
  const response = await orderApi.get<OrderResponse>(`/${id}`);
  return response.data;
};

export const getOrdersByUserId = async (
  userId: string,
): Promise<OrderResponse[]> => {
  const response = await orderApi.get<OrderResponse[]>(`/user/${userId}`);
  return response.data;
};

export const createOrderFromCart = async (
  userId: string,
): Promise<OrderResponse> => {
  const response = await orderApi.post<OrderResponse>(`/from-cart/${userId}`);
  return response.data;
};
