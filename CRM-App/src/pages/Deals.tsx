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
import { FormModal } from "@/components/ui/FormModal";
import { Input } from "@/components/ui/input";

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
    if (draggingDeal) {
      debouncedUpdateDealStage(draggingDeal, stage);
      setDraggingDeal(null);
    }
  };

  // Debounce function
  function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number
  ): (...args: Params) => void {
    let timer: NodeJS.Timeout;
    return (...args: Params) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }

  const updateDealStage = async (dealId: string, stage: string) => {
    try {
      const response = await fetch(`http://localhost:8000/deals/${dealId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stage }),
      });

      if (response.ok) {
        console.log(`Deal ${dealId} moved to ${stage}`);
        // Refresh deals
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
      } else {
        console.error(`Failed to update deal ${dealId}`);
      }
    } catch (error) {
      console.error("Error updating deal:", error);
    }
  };

  const debouncedUpdateDealStage = debounce(updateDealStage, 500);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <FormModal
          title="Add Deal"
          description="Create a new deal in your CRM"
          trigger={
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>Add Deal</span>
            </Button>
          }
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const title = (document.getElementById("title") as HTMLInputElement).value;
              const company = (document.getElementById("company") as HTMLInputElement).value;
              const contactId = (document.getElementById("contactId") as HTMLInputElement).value;
              const value = (document.getElementById("value") as HTMLInputElement).value;
              const stage = (document.getElementById("stage") as HTMLInputElement).value;
              const date = (document.getElementById("date") as HTMLInputElement).value;
              try {
                const response = await fetch("http://localhost:8000/deals", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    title: title,
                    company: company,
                    contactId: contactId,
                    value: value,
                    stage: stage,
                    date: date,
                  }),
                });
                if (response.ok) {
                  console.log("Deal created successfully!");
                  window.location.reload();
                  // Optionally, you can refresh the deal list here
                } else {
                  console.error("Failed to create deal");
                }
              } catch (error) {
                console.error("Error creating deal:", error);
              }
            }}
            className="grid gap-4 py-4"
          >
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right absolute top-0 left-0 px-2 py-1 bg-white text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-translate-y-2 peer-focus:translate-x-1 peer-focus:text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">
                Title
              </label>
              <Input id="title" className="col-span-3 peer" placeholder="Title" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="company" className="text-right absolute top-0 left-0 px-2 py-1 bg-white text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-translate-y-2 peer-focus:translate-x-1 peer-focus:text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">
                Company
              </label>
              <Input id="company" className="col-span-3 peer" placeholder="Company" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="contactId" className="text-right absolute top-0 left-0 px-2 py-1 bg-white text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-translate-y-2 peer-focus:translate-x-1 peer-focus:text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">
                Contact ID
              </label>
              <Input id="contactId" className="col-span-3 peer" placeholder="Contact ID" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="value" className="text-right absolute top-0 left-0 px-2 py-1 bg-white text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-translate-y-2 peer-focus:translate-x-1 peer-focus:text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">
                Value
              </label>
              <Input id="value" className="col-span-3 peer" placeholder="Value" type="number" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="stage" className="text-right absolute top-0 left-0 px-2 py-1 bg-white text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-translate-y-2 peer-focus:translate-x-1 peer-focus:text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">
                Stage
              </label>
              <Input id="stage" className="col-span-3 peer" placeholder="Stage" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right absolute top-0 left-0 px-2 py-1 bg-white text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-translate-y-2 peer-focus:translate-x-1 peer-focus:text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">
                Date
              </label>
              <Input id="date" className="col-span-3 peer" placeholder="Date" type="date" required/>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Create Deal</Button>
            </div>
          </form>
        </FormModal>
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