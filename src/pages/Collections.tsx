import { useState } from "react";
import { Plus } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { CollectionCard } from "@/components/CollectionCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock data - replace with real data from your backend
const mockCollections = [
  {
    id: 1,
    name: "Summer Collection",
    productCount: 24,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
  },
  {
    id: 2,
    name: "Winter Essentials",
    productCount: 18,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
  },
  {
    id: 3,
    name: "Accessories",
    productCount: 42,
    image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80",
  },
  {
    id: 4,
    name: "New Arrivals",
    productCount: 15,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
  },
];

export default function Collections() {
  const [collections] = useState(mockCollections);

  const handleEdit = (id: number) => {
    toast.info("Edit collection functionality coming soon!");
  };

  const handleDelete = (id: number) => {
    toast.info("Delete collection functionality coming soon!");
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
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Collection
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              name={collection.name}
              productCount={collection.productCount}
              image={collection.image}
              onEdit={() => handleEdit(collection.id)}
              onDelete={() => handleDelete(collection.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
