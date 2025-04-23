
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend = "neutral",
  trendValue,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("card-hover", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {Icon && (
            <Icon
              size={20}
              className={cn(
                "text-muted-foreground",
                trend === "up" && "text-green-500",
                trend === "down" && "text-red-500"
              )}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trendValue) && (
          <CardDescription className="flex items-center mt-2">
            {trendValue && (
              <span
                className={cn(
                  "mr-1 text-xs font-medium",
                  trend === "up" && "text-green-500",
                  trend === "down" && "text-red-500",
                  trend === "neutral" && "text-muted-foreground"
                )}
              >
                {trendValue}
              </span>
            )}
            {description && <span className="text-xs">{description}</span>}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
