import api from "../API/api";
import type { Product } from "../types/Product";

export async function getProductsByType(slug: string) {
  const response = await api.get<Product[]>(`/api/products/type/${slug}`);
  return response.data;
}