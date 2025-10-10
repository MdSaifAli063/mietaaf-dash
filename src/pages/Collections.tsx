import { useState } from "react";
import { Plus } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { CollectionCard } from "@/components/CollectionCard";
import { Button } from "@/components/ui/button";
import { useCollections } from "@/hooks/useCollections";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Collections() {
  const { collections, isLoading, createCollection, updateCollection, deleteCollection } = useCollections();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    product_count: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCollection({ id: editingId, ...formData });
    } else {
      createCollection(formData);
    }
    setDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", image_url: "", product_count: 0 });
    setEditingId(null);
  };

  const handleEdit = (collection: any) => {
    setFormData({
      name: collection.name,
      description: collection.description || "",
      image_url: collection.image_url || "",
      product_count: collection.product_count,
    });
    setEditingId(collection.id);
    setDialogOpen(true);
  };

  return (
    <div className="flex-1">
      <DashboardHeader />
      
      <main className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Collections</h1>
            <p className="text-muted-foreground mt-1">Manage your product collections</p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" onClick={resetForm}>
                <Plus className="h-4 w-4" />
                New Collection
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Collection" : "Create Collection"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product_count">Product Count</Label>
                  <Input
                    id="product_count"
                    type="number"
                    value={formData.product_count}
                    onChange={(e) => setFormData({ ...formData, product_count: parseInt(e.target.value) })}
                    min="0"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingId ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collections?.map((collection) => (
              <CollectionCard
                key={collection.id}
                name={collection.name}
                productCount={collection.product_count}
                image={collection.image_url || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"}
                onEdit={() => handleEdit(collection)}
                onDelete={() => deleteCollection(collection.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
