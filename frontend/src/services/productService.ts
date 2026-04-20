import api from "../api/api";
import type { Product } from "../types/product";

export async function getProductsByType(slug: string) {
  const response = await api.get<Product[]>(`/api/products/type/${slug}`);
  return response.data;
}