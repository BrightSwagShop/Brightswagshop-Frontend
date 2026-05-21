import api from "../API/api";
import type { Product } from "../types/Product";

export type AdminProductResponse = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  productType: string;
  isActive: boolean;
  kleuren?: {
    kleur?: string;
    imageUrl?: string;
    maten?: unknown[];
    stock?: number;
    sku?: string;
  }[];
};

export async function getAllProducts() {
  const response = await api.get<AdminProductResponse[]>("/api/products");
  return response.data;
}

export async function getProductsByType(slug: string) {
  const response = await api.get<Product[]>(`/api/products/type/${slug}`);
  return response.data;
}
