import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentContactsProps {
  contacts: { id: string; name: string; company: string }[];
}

export default function RecentContacts({ contacts }: RecentContactsProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Contacts</CardTitle>
        <CardDescription>Recent people you interacted with</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {contacts.slice(0, 5).map((contact) => (
            <li
              key={contact.id}
              className="flex items-center gap-3 p-3 rounded-md bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
            >
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{contact.name}</span>
                <span className="text-sm text-muted-foreground">
                  {contact.company}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
