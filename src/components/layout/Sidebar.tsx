
import { Link } from "react-router-dom";
import {
  LayoutDashboard as DashboardIcon,
  Users as EmployeesIcon,
  UserCheck as AttendanceIcon,
  LogIn as LoginIcon,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
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
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 z-20 h-full bg-white border-r transition-all duration-300 transform",
          isOpen ? "w-64 translate-x-0" : "w-20 -translate-x-0 md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <div className={cn("flex items-center", !isOpen && "md:hidden")}>
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                S
              </div>
              <span className={cn("ml-2 font-semibold text-gray-800", !isOpen && "hidden")}>Sheet Savvy</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </Button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md hover:bg-gray-100 transition-colors",
                  "text-gray-700 hover:text-gray-900",
                  window.location.pathname === item.path ? "bg-gray-100 font-medium" : ""
                )}
              >
                <item.icon size={20} className="flex-shrink-0" />
                <span className={cn("ml-3 text-sm", !isOpen && "hidden")}>
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Sidebar footer (optional, could be login link later) */}
          {/* <div className={cn("p-4 border-t", !isOpen && "md:hidden")}>
            <Link to="/login" className="flex items-center text-gray-700 hover:text-blue-600">
              <LoginIcon size={18} />
              <span className={cn("ml-2 text-sm", !isOpen && "hidden")}>Login</span>
            </Link>
          </div> */}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
