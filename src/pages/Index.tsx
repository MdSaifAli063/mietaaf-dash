import { useState, useEffect } from "react";
import { FolderOpen, Package, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCollections } from "@/hooks/useCollections";
import { useProducts } from "@/hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const navigate = useNavigate();
  const { collections } = useCollections();
  const { products } = useProducts();
  const [stats, setStats] = useState({
    revenue: 24580,
    orders: 1429,
    revenueChange: 8,
    ordersChange: 12,
  });

  const recentActivity = [
    { action: "New product added", item: "Wireless Headphones", time: "2 min ago", type: "success" },
    { action: "Collection updated", item: "Summer Collection", time: "15 min ago", type: "info" },
    { action: "Order received", item: "Order #1234", time: "1 hour ago", type: "success" },
    { action: "Low stock alert", item: "Smart Watch", time: "2 hours ago", type: "warning" },
  ];

  const topProducts = [
    { name: "Wireless Headphones", sales: 234, revenue: 11700, trend: "up" },
    { name: "Smart Watch", sales: 189, revenue: 9450, trend: "up" },
    { name: "USB-C Cable", sales: 156, revenue: 780, trend: "down" },
    { name: "Phone Case", sales: 142, revenue: 2840, trend: "up" },
  ];

  return (
    <div className="flex-1 bg-gradient-secondary">
      <DashboardHeader />
      
      <main className="p-8 space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-heading font-bold bg-gradient-primary bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Collections"
            value={collections?.length.toString() || "0"}
            change="+2 this month"
            icon={FolderOpen}
            trend="up"
          />
          <StatsCard
            title="Total Products"
            value={products?.length.toString() || "0"}
            change="+18 this week"
            icon={Package}
            trend="up"
          />
          <StatsCard
            title="Orders"
            value={stats.orders.toLocaleString()}
            change={`+${stats.ordersChange}% from last month`}
            icon={ShoppingCart}
            trend="up"
          />
          <StatsCard
            title="Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            change={`+${stats.revenueChange}% from last month`}
            icon={TrendingUp}
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Collections */}
          <Card className="lg:col-span-1 shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Collections</span>
                <Badge variant="secondary">{collections?.length || 0}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {collections?.slice(0, 4).map((collection, i) => (
                  <div 
                    key={collection.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-card border border-border hover:border-primary/30 transition-all cursor-pointer group"
                    onClick={() => navigate("/collections")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <FolderOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-primary transition-colors">{collection.name}</p>
                        <p className="text-xs text-muted-foreground">{collection.product_count} products</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="lg:col-span-2 shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-muted-foreground/30">#{i + 1}</span>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${product.revenue.toLocaleString()}</p>
                        <div className="flex items-center gap-1 text-sm">
                          {product.trend === "up" ? (
                            <>
                              <ArrowUpRight className="h-3 w-3 text-success" />
                              <span className="text-success">+12%</span>
                            </>
                          ) : (
                            <>
                              <ArrowDownRight className="h-3 w-3 text-destructive" />
                              <span className="text-destructive">-5%</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <Progress value={(product.sales / 250) * 100} className="h-1.5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => navigate("/collections")}
                  className="p-4 text-left rounded-lg bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity group"
                >
                  <FolderOpen className="h-6 w-6 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold">Collections</div>
                  <div className="text-xs opacity-90 mt-1">Manage collections</div>
                </button>
                <button 
                  onClick={() => navigate("/products")}
                  className="p-4 text-left rounded-lg bg-gradient-success text-success-foreground hover:opacity-90 transition-opacity group"
                >
                  <Package className="h-6 w-6 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold">Products</div>
                  <div className="text-xs opacity-90 mt-1">Add new products</div>
                </button>
                <button 
                  onClick={() => navigate("/analytics")}
                  className="p-4 text-left rounded-lg bg-gradient-warning text-warning-foreground hover:opacity-90 transition-opacity group"
                >
                  <TrendingUp className="h-6 w-6 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold">Analytics</div>
                  <div className="text-xs opacity-90 mt-1">View insights</div>
                </button>
                <button 
                  onClick={() => navigate("/settings")}
                  className="p-4 text-left rounded-lg border-2 border-border hover:border-primary hover:bg-accent transition-all group"
                >
                  <ShoppingCart className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
                  <div className="font-semibold">Settings</div>
                  <div className="text-xs text-muted-foreground mt-1">Configure store</div>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "success" ? "bg-success animate-pulse-glow" : 
                      activity.type === "warning" ? "bg-warning animate-pulse-glow" : 
                      "bg-primary"
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.item}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
