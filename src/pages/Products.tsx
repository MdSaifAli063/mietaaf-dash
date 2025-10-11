import { useState } from "react";
import { Plus } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Products() {
  const { products, isLoading, createProduct, updateProduct, deleteProduct } = useProducts();
  const { collections } = useCollections();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    price: 0,
    collection_id: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProduct({ id: editingId, ...formData });
    } else {
      createProduct(formData);
    }
    setDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", image_url: "", price: 0, collection_id: "" });
    setEditingId(null);
  };

  const handleEdit = (product: any) => {
    setFormData({
      name: product.name,
      description: product.description || "",
      image_url: product.image_url || "",
      price: product.price || 0,
      collection_id: product.collection_id || "",
    });
    setEditingId(product.id);
    setDialogOpen(true);
  };

  return (
    <div className="flex-1">
      <DashboardHeader />
      
      <main className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground mt-1">Manage your product inventory</p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" onClick={resetForm}>
                <Plus className="h-4 w-4" />
                New Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Product" : "Create Product"}</DialogTitle>
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
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    required
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
                  <Label htmlFor="collection">Collection</Label>
                  <Select
                    value={formData.collection_id}
                    onValueChange={(value) => setFormData({ ...formData, collection_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a collection" />
                    </SelectTrigger>
                    <SelectContent>
                      {collections?.map((collection) => (
                        <SelectItem key={collection.id} value={collection.id}>
                          {collection.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
                image={product.image_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"}
                onEdit={() => handleEdit(product)}
                onDelete={() => deleteProduct(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products yet. Create your first product to get started!</p>
          </div>
        )}
      </main>
    </div>
  );
}
