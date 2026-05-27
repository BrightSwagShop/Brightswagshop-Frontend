import api from "../API/api";
import type { Product } from "../types/Product";
import { getBugStatuses } from "./bugService";

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

const ensureProductApiIsAvailable = async () => {
  const bugStatuses = await getBugStatuses();

  if (bugStatuses.productApiError) {
    throw new Error(
      "Simulated product API error (debug toggle: productApiError)",
    );
  }
};

export async function getAllProducts() {
  await ensureProductApiIsAvailable();

  const response = await api.get<AdminProductResponse[]>("/api/products");
  return response.data;
}

export async function deleteProduct(id: string) {
  await api.delete(`/api/products/${id}`);
}

export async function updateProduct(
  id: string,
  payload: Record<string, unknown>,
) {
  const response = await api.put<AdminProductResponse>(
    `/api/products/${id}`,
    payload,
  );

  return response.data;
}

export async function getProductsByType(slug: string) {
  await ensureProductApiIsAvailable();

  const response = await api.get<Product[]>(`/api/products/type/${slug}`);
  return response.data;
}
