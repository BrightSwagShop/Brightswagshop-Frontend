import api from "../API/api";

export async function toggleStripePaymentFailure(enabled: boolean) {
  const response = await api.post(
    "/api/debug/toggle/WrongCartTotal",
    enabled
  );

  return response.data;
}
export async function toggleWrongCartTotal() {
  const response = await api.post(
    "/api/debug/toggle/WrongCartTotal"
  );

  return response.data;
}