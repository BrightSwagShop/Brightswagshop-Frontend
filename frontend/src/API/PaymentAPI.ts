import axios from "axios";
import { getApiBaseUrl } from "../Config/apiBaseUrl";

export type CheckoutSessionResponse = {
  sessionId: string;
  sessionUrl: string;
};

const paymentApi = axios.create({
  baseURL: `${getApiBaseUrl()}/api/payments`,
});

export const createCheckoutSession = async (
  orderId: string,
): Promise<CheckoutSessionResponse> => {
  const response = await paymentApi.post<CheckoutSessionResponse>(
    `/${orderId}/checkout`,
  );

  return response.data;
};
