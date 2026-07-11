import { useQuery } from "@tanstack/react-query";
import * as reviewService from "@/services/reviewService";

export function useReviews(itemId: string) {
  return useQuery({
    queryKey: ["reviews", itemId],
    queryFn: () => reviewService.fetchReviews(itemId),
    enabled: !!itemId,
  });
}
