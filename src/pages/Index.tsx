import { FolderOpen, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="flex-1">
      <DashboardHeader />
      
      <main className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Collections"
            value="12"
            change="+2 this month"
            icon={FolderOpen}
            trend="up"
          />
          <StatsCard
            title="Total Products"
            value="248"
            change="+18 this week"
            icon={Package}
            trend="up"
          />
          <StatsCard
            title="Orders"
            value="1,429"
            change="+12% from last month"
            icon={ShoppingCart}
            trend="up"
          />
          <StatsCard
            title="Revenue"
            value="$24,580"
            change="+8% from last month"
            icon={TrendingUp}
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Collections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Summer Collection", "Winter Essentials", "New Arrivals"].map((name, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
                    <span className="font-medium">{name}</span>
                    <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 30) + 10} products</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="w-full p-4 text-left rounded-lg border border-border hover:bg-accent transition-colors">
                  <div className="font-medium">Add New Collection</div>
                  <div className="text-sm text-muted-foreground mt-1">Create a new product collection</div>
                </button>
                <button className="w-full p-4 text-left rounded-lg border border-border hover:bg-accent transition-colors">
                  <div className="font-medium">Add Product</div>
                  <div className="text-sm text-muted-foreground mt-1">Add a new product to your store</div>
                </button>
                <button className="w-full p-4 text-left rounded-lg border border-border hover:bg-accent transition-colors">
                  <div className="font-medium">View Analytics</div>
                  <div className="text-sm text-muted-foreground mt-1">Check your store performance</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
