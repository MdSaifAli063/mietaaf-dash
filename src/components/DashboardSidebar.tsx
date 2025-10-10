import { Home, FolderOpen, Package, Settings, BarChart3 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "Collections", icon: FolderOpen, path: "/collections" },
  { title: "Products", icon: Package, path: "/products" },
  { title: "Analytics", icon: BarChart3, path: "/analytics" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

export function DashboardSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          Mietaaf
        </h1>
        <p className="text-sm text-sidebar-foreground/60 mt-1">Dashboard</p>
      </div>
      
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-sidebar-accent text-sidebar-foreground",
                isActive && "bg-sidebar-accent text-sidebar-primary font-medium"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
