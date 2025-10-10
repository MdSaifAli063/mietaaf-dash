import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Collection {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  product_count: number;
  created_at: string;
  updated_at: string;
}

export function useCollections() {
  const queryClient = useQueryClient();

  const { data: collections, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Collection[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (collection: Omit<Collection, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from("collections")
        .insert([collection])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Collection created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create collection");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Collection> & { id: string }) => {
      const { data, error } = await supabase
        .from("collections")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Collection updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update collection");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("collections")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Collection deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete collection");
    },
  });

  return {
    collections,
    isLoading,
    createCollection: createMutation.mutate,
    updateCollection: updateMutation.mutate,
    deleteCollection: deleteMutation.mutate,
  };
}
