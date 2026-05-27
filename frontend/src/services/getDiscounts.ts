import type { Discount } from "../types/Discount";
import { fetchWithAuth } from "./adminApi";


export const getDiscounts = async () => {
  const res = await fetchWithAuth("/discounts");
  return res.data as Discount[];
};