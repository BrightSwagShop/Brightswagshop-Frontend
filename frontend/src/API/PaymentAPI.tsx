import axios from "axios";

export type CheckoutSessionResponse = {
  sessionId: string;
  sessionUrl: string;
};

const paymentApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/payments`,
});

export const createCheckoutSession = async (
  orderId: string,
): Promise<CheckoutSessionResponse> => {
  const response = await paymentApi.post<CheckoutSessionResponse>(
    `/${orderId}/checkout`,
  );

  return response.data;
};
