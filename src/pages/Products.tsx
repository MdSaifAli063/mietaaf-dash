import { DashboardHeader } from "@/components/DashboardHeader";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Products() {
  return (
    <div className="flex-1">
      <DashboardHeader />
      
      <main className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground mt-1">Manage your product inventory</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Product
          </Button>
        </div>
        
        <div className="text-center py-12 text-muted-foreground">
          Products page coming soon
        </div>
      </main>
    </div>
  );
}
