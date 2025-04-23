import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LatestDealsProps {
  deals: { id: string; title: string; company: string; value: number; stage: string }[];
}

export default function LatestDeals({ deals }: LatestDealsProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Latest Deals</CardTitle>
        <CardDescription>Your most recent deal opportunities</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {deals.slice(0, 5).map((deal) => (
            <li
              key={deal.id}
              className="flex items-center justify-between p-3 rounded-md bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
            >
              <div className="flex flex-col">
                <span className="font-medium">{deal.title}</span>
                <span className="text-sm text-muted-foreground">
                  {deal.company}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">
                  {deal.value.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                  })}
                </span>
                <Badge
                  className={cn(
                    deal.stage === "Qualified" && "bg-blue-500",
                    deal.stage === "Proposal" && "bg-yellow-500",
                    deal.stage === "Negotiation" && "bg-orange-500",
                    deal.stage === "Won" && "bg-green-500"
                  )}
                >
                  {deal.stage}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
