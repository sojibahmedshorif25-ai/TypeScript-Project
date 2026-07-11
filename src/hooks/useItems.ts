import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as itemService from "@/services/itemService";
import toast from "react-hot-toast";

export function useItems(params: Record<string, string | number | undefined> = {}) {
  return useQuery({
    queryKey: ["items", params],
    queryFn: () => itemService.fetchItems(params as Record<string, string>),
  });
}

export function useItem(id: string) {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => itemService.fetchItem(id),
    enabled: !!id,
  });
}

export function useUserItems(params: Record<string, string | number | undefined> = {}) {
  return useQuery({
    queryKey: ["userItems", params],
    queryFn: () => itemService.fetchUserItems(params as Record<string, string>),
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => itemService.createItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["userItems"] });
      toast.success("Item listed successfully!");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to create item");
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      itemService.updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item"] });
      queryClient.invalidateQueries({ queryKey: ["userItems"] });
      toast.success("Item updated successfully!");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to update item");
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => itemService.deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["userItems"] });
      toast.success("Item deleted successfully");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to delete item");
    },
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => itemService.fetchDashboardStats(),
  });
}
