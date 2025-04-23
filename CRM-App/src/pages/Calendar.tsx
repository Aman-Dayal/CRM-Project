
import { FormModal } from "@/components/ui/FormModal";
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

        <Card className="md:col-span-2 p-6 relative">
          <div className="flex items-center gap-2 mb-6">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">
              {date?.toLocaleDateString("en-US", {
                // weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h2>
          </div>
          {date && date >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) && (
            <FormModal
              title="Create Event"
              description="Schedule a new event on this date"
              trigger={
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-4 right-4">
                  Create Event
                </button>
              }
            >
              <form className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="title" className="text-right">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="col-span-3 rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="Title"
                  />
              </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="time" className="text-right">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    className="col-span-3 rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="Time"
                  />
              </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="type" className="text-right">
                    Type
                  </label>
                  <select
                    id="type"
                    className="col-span-3 rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    <option value="meeting">Type</option>
                    <option value="call">Call</option>
                    <option value="task">Task</option>
                  </select>
              </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Create
                  </button>
                </div>
              </form>
            </FormModal>
          )}
        </Card>
      </div>
    </div>
  );
}
