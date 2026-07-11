import { api } from "./api";
import type { UserType } from "@/types";

export interface AuthResult {
  user: UserType;
  token: string;
}

export async function registerUser(name: string, email: string, password: string) {
  const { data } = await api.post<{ success: boolean; data: AuthResult }>("/auth/register", {
    name,
    email,
    password,
  });
  return data.data;
}

export async function loginUser(email: string, password: string) {
  const { data } = await api.post<{ success: boolean; data: AuthResult }>("/auth/login", {
    email,
    password,
  });
  return data.data;
}

export async function logoutUser() {
  await api.post("/auth/logout");
}

export async function getCurrentUser() {
  const { data } = await api.get<{ success: boolean; data: UserType }>("/auth/me");
  return data.data;
}
