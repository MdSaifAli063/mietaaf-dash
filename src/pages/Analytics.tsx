import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Package,
  Eye,
  MousePointerClick
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");

  const metrics = [
    { label: "Total Views", value: "45,231", change: "+12.5%", trend: "up", icon: Eye },
    { label: "Conversions", value: "3,429", change: "+8.3%", trend: "up", icon: MousePointerClick },
    { label: "Avg. Order Value", value: "$142.50", change: "-2.1%", trend: "down", icon: DollarSign },
    { label: "Active Users", value: "1,234", change: "+15.2%", trend: "up", icon: Users },
  ];

  const salesData = [
    { day: "Mon", sales: 4200, orders: 42 },
    { day: "Tue", sales: 5100, orders: 51 },
    { day: "Wed", sales: 6800, orders: 68 },
    { day: "Thu", sales: 5400, orders: 54 },
    { day: "Fri", sales: 7200, orders: 72 },
    { day: "Sat", sales: 9100, orders: 91 },
    { day: "Sun", sales: 6500, orders: 65 },
  ];

  const topCategories = [
    { name: "Electronics", sales: 28400, percentage: 35, color: "bg-primary" },
    { name: "Clothing", sales: 22100, percentage: 27, color: "bg-success" },
    { name: "Accessories", sales: 16200, percentage: 20, color: "bg-warning" },
    { name: "Home & Garden", sales: 14500, percentage: 18, color: "bg-destructive" },
  ];

  const recentOrders = [
    { id: "ORD-1234", customer: "John Doe", amount: 245.50, status: "completed" },
    { id: "ORD-1235", customer: "Jane Smith", amount: 189.00, status: "processing" },
    { id: "ORD-1236", customer: "Bob Johnson", amount: 420.75, status: "completed" },
    { id: "ORD-1237", customer: "Alice Brown", amount: 156.25, status: "pending" },
  ];

  const maxSales = Math.max(...salesData.map(d => d.sales));

  return (
    <div className="flex-1 bg-gradient-secondary">
      <DashboardHeader />
      
      <main className="p-8 space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-heading font-bold bg-gradient-primary bg-clip-text text-transparent">
              Analytics
            </h1>
            <p className="text-muted-foreground mt-2">Track your store performance and insights</p>
          </div>
          
          <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
            <TabsList>
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
              <TabsTrigger value="90d">90d</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <Card key={i} className="shadow-card hover:shadow-elevated transition-all hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${
                    metric.trend === "up" ? "bg-success/10" : "bg-destructive/10"
                  }`}>
                    <metric.icon className={`h-5 w-5 ${
                      metric.trend === "up" ? "text-success" : "text-destructive"
                    }`} />
                  </div>
                  <Badge variant={metric.trend === "up" ? "default" : "destructive"} className="gap-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {metric.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold">{metric.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <Card className="lg:col-span-2 shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Sales Overview</span>
                <Badge variant="outline">Last 7 days</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesData.map((day, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{day.day}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">{day.orders} orders</span>
                        <span className="font-semibold">${day.sales.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 bg-gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${(day.sales / maxSales) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Categories */}
          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <CardTitle>Top Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {topCategories.map((category, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={category.percentage} className="h-2 flex-1" />
                    <span className="text-sm font-semibold min-w-[70px] text-right">
                      ${category.sales.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Orders</span>
                <ShoppingCart className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gradient-card border border-border hover:border-primary/30 transition-all">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.amount.toFixed(2)}</p>
                      <Badge variant={
                        order.status === "completed" ? "default" :
                        order.status === "processing" ? "secondary" :
                        "outline"
                      } className="text-xs">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Performance Metrics</span>
                <Package className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Conversion Rate</span>
                  <span className="text-sm font-semibold">7.58%</span>
                </div>
                <Progress value={75.8} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Customer Satisfaction</span>
                  <span className="text-sm font-semibold">94.2%</span>
                </div>
                <Progress value={94.2} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Order Fulfillment</span>
                  <span className="text-sm font-semibold">88.5%</span>
                </div>
                <Progress value={88.5} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Return Rate</span>
                  <span className="text-sm font-semibold">2.3%</span>
                </div>
                <Progress value={2.3} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
