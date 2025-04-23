
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard as DashboardIcon,
  Users as EmployeesIcon,
  UserCheck as AttendanceIcon,
} from "lucide-react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navItems = [
  { name: "Dashboard", path: "/", icon: DashboardIcon },
  { name: "Employees", path: "/employees", icon: EmployeesIcon },
  { name: "Attendance", path: "/attendance", icon: AttendanceIcon },
];

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  
  return (
    <SidebarProvider defaultOpen={isOpen} open={isOpen} onOpenChange={setIsOpen}>
      <ShadcnSidebar>
        <SidebarHeader className="border-b">
          <div className={cn("flex items-center px-4 py-5")}>
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
              S
            </div>
            <span className={cn("ml-2 font-semibold", !isOpen && "hidden md:flex")}>
              Sheet Savvy
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex ml-auto"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </Button>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.path}
                  tooltip={!isOpen ? item.name : undefined}
                >
                  <Link to={item.path} className="flex items-center w-full">
                    <item.icon className="flex-shrink-0" />
                    <span className={cn("ml-3", !isOpen && "hidden")}>
                      {item.name}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </ShadcnSidebar>
    </SidebarProvider>
  );
};

export default Sidebar;
