import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Search, Plus, MoreHorizontal, Filter, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormModal } from "@/components/ui/FormModal";

interface Company {
  id: string;
  name: string;
  industry: string;
  website: string;
  location: string;
  status: string;
  contactCount: number;
}

export default function Companies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/companies");
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardDescription>
            Manage your client and prospect companies
          </CardDescription>
          </div>
          <FormModal
            title="Add Company"
            description="Create a new company in your CRM"
            trigger={
              <Button className="flex items-center gap-2 ">
                <Plus size={16} />
                <span>Add Company</span>
              </Button>
            }
          >
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const name = (document.getElementById("name") as HTMLInputElement).value;
                const industry = (document.getElementById("industry") as HTMLInputElement).value;
                const website = (document.getElementById("website") as HTMLInputElement).value;
                const location = (document.getElementById("location") as HTMLInputElement).value;
                const status = (document.getElementById("status") as HTMLInputElement).value;

                try {
                  const response = await fetch("http://localhost:8000/companies", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ 
                      name: name, 
                      industry: industry, 
                      website: website, 
                      location: location, 
                      status: status 
                    }),
                  });

                  if (response.ok) {
                    console.log("Company created successfully!");
                    window.location.reload();
                    // Optionally, you can refresh the company list here
                  } else {
                    console.error("Failed to create company:", response.status);
                  }
                } catch (error) {
                  console.error("Error creating company:", error);
                }
              }}
              className="grid gap-4 py-4"
            >
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right absolute top-0 left-0 px-2 py-1 bg-white text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-translate-y-2 peer-focus:translate-x-1 peer-focus:text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">
                  Name
                </label>
                <Input id="name" className="col-span-3 peer" placeholder="Name" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="industry" className="text-right absolute top-0 left-0 px-2 py-1 bg-white text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-translate-y-2 peer-focus:translate-x-1 peer-focus:text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">
                  Industry
                </label>
                <Input id="industry" className="col-span-3 peer" placeholder="Industry" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="website" className="text-right absolute top-0 left-0 px-2 py-1 bg-white text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-translate-y-2 peer-focus:translate-x-1 peer-focus:text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">
                  Website
                </label>
                <Input id="website" className="col-span-3 peer" placeholder="Website" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="location" className="text-right absolute top-0 left-0 px-2 py-1 bg-white text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-translate-y-2 peer-focus:translate-x-1 peer-focus:text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">
                  Location
                </label>
                <Input id="location" className="col-span-3 peer" placeholder="Location" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right absolute top-0 left-0 px-2 py-1 bg-white text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-translate-y-2 peer-focus:translate-x-1 peer-focus:text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">
                  Status
                </label>
                <Input id="status" className="col-span-3 peer" placeholder="Status" required />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Create Company</Button>
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
                placeholder="Search companies..."
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
                  <TableHead className="hidden md:table-cell">Industry</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Contacts</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No companies found. Try a different search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCompanies.map((company) => (
                    <TableRow key={company.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="bg-muted flex items-center justify-center w-9 h-9 rounded-md">
                            <Building2 size={18} className="text-foreground" />
                          </div>
                          <span className="font-medium">{company.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {company.industry}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "whitespace-nowrap",
                            company.status === "Customer" && "bg-green-500",
                            company.status === "Prospect" && "bg-blue-500",
                            company.status === "Lead" && "bg-yellow-500"
                          )}
                        >
                          {company.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {company.contactCount}
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
