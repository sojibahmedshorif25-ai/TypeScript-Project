import { api } from "./api";
import type { ItemType } from "@/types";

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ItemsResponse {
  items: ItemType[];
  pagination: PaginationInfo;
}

interface ItemQueryParams {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  location?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function fetchItems(params: ItemQueryParams = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });
  const { data } = await api.get<{ success: boolean; data: ItemsResponse }>(`/items?${query}`);
  return data.data;
}

export async function fetchItem(id: string) {
  const { data } = await api.get<{ success: boolean; data: ItemType }>(`/items/${id}`);
  return data.data;
}

export async function fetchUserItems(params: ItemQueryParams = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });
  const { data } = await api.get<{ success: boolean; data: ItemsResponse }>(`/items/mine?${query}`);
  return data.data;
}

export async function createItem(itemData: Record<string, unknown>) {
  const { data } = await api.post<{ success: boolean; data: ItemType }>("/items", itemData);
  return data.data;
}

export async function updateItem(id: string, itemData: Record<string, unknown>) {
  const { data } = await api.put<{ success: boolean; data: ItemType }>(`/items/${id}`, itemData);
  return data.data;
}

export async function deleteItem(id: string) {
  await api.delete(`/items/${id}`);
}

export async function fetchDashboardStats() {
  const { data } = await api.get<{ success: boolean; data: Record<string, unknown> }>("/items/dashboard");
  return data.data;
}
