import { DashboardHeader } from "@/components/DashboardHeader";

export default function Analytics() {
  return (
    <div className="flex-1">
      <DashboardHeader />
      
      <main className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your store performance</p>
        </div>
        
        <div className="text-center py-12 text-muted-foreground">
          Analytics page coming soon
        </div>
      </main>
    </div>
  );
}
