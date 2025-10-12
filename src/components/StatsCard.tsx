import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
}

export function StatsCard({ title, value, change, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-primary/10 hover:border-primary/30 animate-fade-in bg-gradient-to-br from-card to-accent/5">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{title}</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">{value}</p>
            {change && (
              <p
                className={cn(
                  "text-sm font-bold flex items-center gap-1",
                  trend === "up" ? "text-success" : "text-destructive"
                )}
              >
                <span className={cn(
                  "inline-block",
                  trend === "up" ? "animate-bounce" : ""
                )}>
                  {trend === "up" ? "↑" : "↓"}
                </span>
                {change}
              </p>
            )}
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20 animate-pulse-glow">
            <Icon className="h-7 w-7 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
