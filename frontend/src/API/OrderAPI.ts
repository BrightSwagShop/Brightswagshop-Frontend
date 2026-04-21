import axios from "axios";

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
  baseURL: `${import.meta.env.VITE_API_URL}/api/orders`,
});

export const createOrderFromCart = async (
  userId: string,
): Promise<OrderResponse> => {
  const response = await orderApi.post<OrderResponse>(`/from-cart/${userId}`);
  return response.data;
};
