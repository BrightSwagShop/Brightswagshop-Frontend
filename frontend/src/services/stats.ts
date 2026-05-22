// services/stats.ts

import { fetchWithAuth } from "./adminApi";

 

export const getRevenueStats = async () => {
  const res = await fetchWithAuth("/stats/revenue");
  return res.data;
};

export const getOrderStatusStats = async () => {
  const res = await fetchWithAuth("/stats/orders-status");
  return res.data;
};