import { api } from "./api";

interface ReviewData {
  _id: string;
  userId: { _id: string; name: string; email: string };
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsResponse {
  reviews: ReviewData[];
  averageRating: number;
  totalReviews: number;
}

export async function fetchReviews(itemId: string) {
  const { data } = await api.get<{ success: boolean; data: ReviewsResponse }>(`/items/${itemId}/reviews`);
  return data.data;
}

export async function createReview(itemId: string, rating: number, comment: string) {
  const { data } = await api.post<{ success: boolean; data: ReviewData }>(`/items/${itemId}/reviews`, {
    rating,
    comment,
  });
  return data.data;
}
