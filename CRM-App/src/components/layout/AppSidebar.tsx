
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  BarChart3,
  Calendar,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  isCollapsed: boolean;
};

const NavItem = ({ icon, label, to, isCollapsed }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground transition-colors",
          isCollapsed ? "justify-center px-2" : "",
          isActive
            ? "bg-sidebar-accent text-primary"
            : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
        )
      }
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
};

export default function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "h-screen bg-sidebar fixed left-0 top-0 z-30 flex flex-col border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-14" : "w-56"
      )}
    >
      <div className="flex items-center justify-between h-14 px-3 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="text-sidebar-foreground font-bold text-xl">CRM Pro</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:bg-sidebar-accent/50"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>
      <nav className="flex flex-col gap-1 p-2 mt-2">
        <NavItem
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          to="/"
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<Users size={20} />}
          label="Contacts"
          to="/contacts"
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<Building2 size={20} />}
          label="Companies"
          to="/companies"
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<BarChart3 size={20} />}
          label="Deals"
          to="/deals"
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<Calendar size={20} />}
          label="Calendar"
          to="/calendar"
          isCollapsed={isCollapsed}
        />
      </nav>
      <div className="mt-auto p-2">
        <NavItem
          icon={<Settings size={20} />}
          label="Settings"
          to="/settings"
          isCollapsed={isCollapsed}
        />
      </div>
    </div>
  );
}
