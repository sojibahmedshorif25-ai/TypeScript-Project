export interface ItemType {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  location: string;
  priority?: "low" | "medium" | "high";
  date?: string;
  userId: string | { _id: string; name: string; email: string };
  createdAt: string;
  updatedAt?: string;
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface AuthResult {
  user: UserType;
  token: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
