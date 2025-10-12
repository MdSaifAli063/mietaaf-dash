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
      toast.success("Collection created successfully!", {
        description: "Your collection has been added.",
      });
    },
    onError: (error: any) => {
      toast.error("Failed to create collection", {
        description: error.message || "Please try again later.",
      });
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
      toast.success("Collection updated successfully!", {
        description: "Your changes have been saved.",
      });
    },
    onError: (error: any) => {
      toast.error("Failed to update collection", {
        description: error.message || "Please try again later.",
      });
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
      toast.success("Collection deleted successfully!", {
        description: "The collection has been removed.",
      });
    },
    onError: (error: any) => {
      toast.error("Failed to delete collection", {
        description: error.message || "Please try again later.",
      });
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
