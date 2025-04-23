import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Plus, MoreHorizontal, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormModal } from "@/components/ui/FormModal";

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: string;
  lastContact: string;
}

export default function Contacts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/contacts");
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
        <div>
          {/* <CardTitle>Contact List</CardTitle> */}
          <CardDescription>
            Manage your contacts and their information
          </CardDescription>
        </div>
          <FormModal
            title="Add Contact"
            description="Create a new contact in your CRM"
            trigger={
              <Button className="flex items-center gap-2 self-start">
                <Plus className="mr-2 h-4 w-4" />
                <span>Add Contact</span>
              </Button>
            }
          >
            <form className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right absolute top-0 left-0 px-2 py-1 bg-white text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-translate-y-2 peer-focus:translate-x-1 peer-focus:text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">
                  Name
                </label>
                <Input id="name" className="col-span-3 peer" placeholder="Name" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right absolute top-0 left-0 px-2 py-1 bg-white text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-translate-y-2 peer-focus:translate-x-1 peer-focus:text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">
                  Email
                </label>
                <Input id="email" className="col-span-3 peer" placeholder="Email" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="company" className="text-right absolute top-0 left-0 px-2 py-1 bg-white text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-translate-y-2 peer-focus:translate-x-1 peer-focus:text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">
                  Company
                </label>
                <Input id="company" className="col-span-3 peer" placeholder="Company" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phone" className="text-right absolute top-0 left-0 px-2 py-1 bg-white text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-translate-y-2 peer-focus:translate-x-1 peer-focus:text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">
                  Phone
                </label>
                <Input id="phone" className="col-span-3 peer" placeholder="Phone" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right absolute top-0 left-0 px-2 py-1 bg-white text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-translate-y-2 peer-focus:translate-x-1 peer-focus:text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">
                  Status
                </label>
                <Input id="status" className="col-span-3 peer" placeholder="Status" />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Create Contact</Button>
              </div>
            </form>
          </FormModal>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-between">
            <div className="relative max-w-sm w-full">
              <Search
                size={18}
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
              <Input
                className="pl-9 w-full"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">Company</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No contacts found. Try a different search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContacts.map((contact) => (
                    <TableRow key={contact.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {contact.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{contact.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {contact.company}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {contact.phone}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="data-[state=open]:bg-muted"
                            >
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
