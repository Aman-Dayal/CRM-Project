
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Event = {
  id: string;
  title: string;
  date: Date;
  type: "meeting" | "call" | "task";
};

const events: Event[] = [
  {
    id: "1",
    title: "Client Meeting - Tech Corp",
    date: new Date(2025, 3, 15, 10, 0),
    type: "meeting",
  },
  {
    id: "2",
    title: "Call with Marketing Team",
    date: new Date(2025, 3, 16, 14, 30),
    type: "call",
  },
  {
    id: "3",
    title: "Follow up with Lead",
    date: new Date(2025, 3, 17, 11, 0),
    type: "task",
  },
  {
    id: "4",
    title: "Demo Presentation",
    date: new Date(2025, 3, 18, 15, 0),
    type: "meeting",
  },
  {
    id: "5",
    title: "Contract Review",
    date: new Date(2025, 3, 20, 9, 0),
    type: "task",
  },
];

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const getEventsForDate = (date?: Date) => {
    if (!date) return [];
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  const selectedDayEvents = getEventsForDate(date);

  return (
    <div className="space-y-6 animate-fade-in">


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border rounded-md"
            components={{
              DayContent: (props) => {
                const dateEvents = getEventsForDate(props.date);
                return (
                  <div className="relative">
                    <div>{props.date.getDate()}</div>
                    {dateEvents.length > 0 && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                );
              },
            }}
          />
        </Card>

        <Card className="md:col-span-2 p-6">
          <div className="flex items-center gap-2 mb-6">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">
              {date?.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h2>
          </div>

          {selectedDayEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 border rounded-md border-dashed">
              <p className="text-muted-foreground">No events scheduled</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDayEvents.map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "p-3 rounded-md border-l-4",
                    event.type === "meeting" && "border-l-blue-500 bg-blue-50",
                    event.type === "call" && "border-l-green-500 bg-green-50",
                    event.type === "task" && "border-l-amber-500 bg-amber-50"
                  )}
                >
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.date.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
