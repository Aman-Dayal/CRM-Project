import { useState, useEffect } from "react";
import { BarChart3, CreditCard, TrendingUp, Users } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import SalesChart from "@/components/dashboard/SalesChart";
import DealsByStage from "@/components/dashboard/DealsByStage";
import RecentContacts from "@/components/dashboard/RecentContacts";
import LatestDeals from "@/components/dashboard/LatestDeals";

export default function Dashboard() {
  const [totalCustomers, setTotalCustomers] = useState("0");
  const [totalRevenue, setTotalRevenue] = useState("$0");
  const [activeDeals, setActiveDeals] = useState("0");
  const [conversionRate, setConversionRate] = useState("0%");
  const [salesData, setSalesData] = useState<{ month: string; sales: number }[]>([]);
  const [dealsData, setDealsData] = useState<{ id: string; title: string; company: string; value: number; stage: string }[]>([]);
  const [contactsData, setContactsData] = useState<{ id: string; name: string; company: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactsResponse = await fetch("http://localhost:8000/contacts");
        const contacts = await contactsResponse.json();
        setTotalCustomers(contacts.length.toString());
        setContactsData(contacts);

        const dealsResponse = await fetch("http://localhost:8000/deals");
        const deals = await dealsResponse.json();
        setActiveDeals(deals.length.toString());
        setDealsData(deals);

        // Calculate total revenue (sum of deal values)
        const totalRevenueValue = deals.reduce((sum, deal) => sum + deal.value, 0);
        setTotalRevenue(`$${totalRevenueValue.toLocaleString()}`);

        // Calculate conversion rate (example: won deals / total deals)
        const wonDeals = deals.filter(deal => deal.stage === "Won").length;
        const conversionRateValue = deals.length > 0 ? (wonDeals / deals.length) * 100 : 0;
        setConversionRate(`${conversionRateValue.toFixed(1)}%`);

        // Fetch sales data (replace with actual endpoint when available)
        const salesResponse = await fetch("http://localhost:8000/deals");
        const salesDeals = await salesResponse.json();
        // Transform deals data to sales data (month, sales)
        const transformedSalesData = salesDeals.map(deal => ({
          month: deal.date.substring(0, 7), // Extract year and month
          sales: deal.value,
        }));
        setSalesData(transformedSalesData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Customers"
          value={totalCustomers}
          description="This month"
          trend="up"
          trendValue="+12.5%"
          icon={Users}
        />
        <StatCard
          title="Total Revenue"
          value={totalRevenue}
          description="This month"
          trend="up"
          trendValue="+5.4%"
          icon={CreditCard}
        />
        <StatCard
          title="Active Deals"
          value={activeDeals}
          description="Update 2h ago"
          trend="neutral"
          icon={BarChart3}
        />
        <StatCard
          title="Conversion Rate"
          value={conversionRate}
          description="This month"
          trend="down"
          trendValue="-2.3%"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={salesData} />
        </div>
        <div>
          <DealsByStage deals={dealsData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentContacts contacts={contactsData} />
        <LatestDeals deals={dealsData} />
      </div>
    </div>
  );
}
