import api from "../API/api";

export async function toggleStripePaymentFailure(enabled: boolean) {
  const response = await api.post(
    "/api/admins/toggle-payment-failure",
    enabled
  );

  return response.data;
}