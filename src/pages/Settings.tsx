import { DashboardHeader } from "@/components/DashboardHeader";

export default function Settings() {
  return (
    <div className="flex-1">
      <DashboardHeader />
      
      <main className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your dashboard preferences</p>
        </div>
        
        <div className="text-center py-12 text-muted-foreground">
          Settings page coming soon
        </div>
      </main>
    </div>
  );
}
