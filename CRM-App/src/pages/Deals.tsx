import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";

// Deal stages
const stages = ["Qualified", "Proposal", "Negotiation", "Won", "Lost"];

// Colors for each stage
const stageColors = {
  Qualified: "bg-blue-50 border-blue-300",
  Proposal: "bg-yellow-50 border-yellow-300",
  Negotiation: "bg-orange-50 border-orange-300",
  Won: "bg-green-50 border-green-300",
  Lost: "bg-red-50 border-red-300",
};

const stageTitleColors = {
  Qualified: "text-blue-700",
  Proposal: "text-yellow-700",
  Negotiation: "text-orange-700",
  Won: "text-green-700",
  Lost: "text-red-700",
};

interface Deal {
  id: string;
  title: string;
  company: string;
  contactId: string;
  value: number;
  stage: string;
  date: string;
}

export default function Deals() {
  const [draggingDeal, setDraggingDeal] = useState<string | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/deals");
        const data = await response.json();
        setDeals(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Group deals by stage
  const dealsByStage = stages.reduce((acc, stage) => {
    acc[stage] = deals.filter((deal) => deal.stage === stage);
    return acc;
  }, {} as Record<string, Deal[]>);

  // Handle drag start
  const handleDragStart = (dealId: string) => {
    setDraggingDeal(dealId);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (stage: string) => {
    console.log(`Deal ${draggingDeal} moved to ${stage}`);
    setDraggingDeal(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>Add Deal</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {stages.map((stage) => (
          <div key={stage} className="flex flex-col h-full">
            <div
              className={cn(
                "rounded-t-md p-2 px-3 text-sm font-semibold border-b",
                stageTitleColors[stage as keyof typeof stageTitleColors]
              )}
            >
              <div className="flex items-center justify-between">
                <span>{stage}</span>
                <span className="bg-background rounded-full text-xs px-2 py-0.5">
                  {dealsByStage[stage]?.length || 0}
                </span>
              </div>
            </div>
            <div
              className={cn(
                "flex-1 p-2 rounded-b-md border border-t-0",
                stageColors[stage as keyof typeof stageColors]
              )}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(stage)}
            >
              {dealsByStage[stage]?.length === 0 ? (
                <div className="h-20 flex items-center justify-center text-sm text-muted-foreground border border-dashed rounded-md">
                  No deals
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {dealsByStage[stage]?.map((deal) => (
                    <Card
                      key={deal.id}
                      className="cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
                      draggable
                      onDragStart={() => handleDragStart(deal.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex flex-col gap-1">
                          <div className="font-medium">{deal.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {deal.company}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-sm font-medium">
                              {deal.value?.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 0,
                              })}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(deal.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}