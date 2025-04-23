
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  BarChart,
  Settings,
  FileText,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/components/theme/theme-provider";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navItems = [
  { 
    name: "Dashboard", 
    path: "/", 
    icon: LayoutDashboard,
    badge: 3 // New alerts or notifications
  },
  { 
    name: "Employees", 
    path: "/employees", 
    icon: Users 
  },
  { 
    name: "Attendance", 
    path: "/attendance", 
    icon: Calendar 
  },
  { 
    name: "Reports", 
    path: "/reports", 
    icon: BarChart 
  },
  { 
    name: "Documents", 
    path: "/documents", 
    icon: FileText 
  },
  { 
    name: "Settings", 
    path: "/settings", 
    icon: Settings 
  },
];

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const handleNavigation = (path: string) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

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
          "fixed top-0 left-0 z-20 h-full bg-gray-800 border-r border-gray-700 transition-all duration-300 ease-in-out transform",
          isOpen ? "w-56 translate-x-0" : "w-20 -translate-x-0 md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
            <div className={cn("flex items-center", !isOpen && "md:hidden")}>
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                S
              </div>
              <span className={cn(
                "ml-2 font-semibold text-white transition-opacity duration-300",
                isOpen ? "opacity-100" : "opacity-0 hidden"
              )}>
                Sheet Savvy
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </Button>
          </div>

          <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
            <TooltipProvider delayDuration={300}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <div key={item.path} className="relative">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleNavigation(item.path)}
                          className={cn(
                            "w-full flex items-center px-3 py-2 rounded-md transition-all duration-200 group",
                            "text-gray-300 hover:text-white hover:bg-gray-700",
                            isActive ? "bg-gray-700 text-white font-medium" : ""
                          )}
                        >
                          <item.icon size={20} className="flex-shrink-0" />
                          <span className={cn(
                            "ml-3 text-sm whitespace-nowrap transition-opacity duration-300",
                            isOpen ? "opacity-100" : "opacity-0 hidden md:block md:opacity-0"
                          )}>
                            {item.name}
                          </span>
                          
                          {item.badge && (
                            <Badge 
                              variant="destructive" 
                              className={cn(
                                "ml-auto", 
                                !isOpen && "absolute right-2 top-1"
                              )}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </button>
                      </TooltipTrigger>
                      {!isOpen && (
                        <TooltipContent side="right">
                          {item.name}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </div>
                );
              })}
            </TooltipProvider>
            
            <div className="pt-4 mt-4 border-t border-gray-700">
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => console.log("Logout")}
                      className="w-full flex items-center px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200"
                    >
                      <LogOut size={20} className="flex-shrink-0" />
                      <span className={cn(
                        "ml-3 text-sm whitespace-nowrap transition-opacity duration-300",
                        isOpen ? "opacity-100" : "opacity-0 hidden md:block md:opacity-0"
                      )}>
                        Logout
                      </span>
                    </button>
                  </TooltipTrigger>
                  {!isOpen && (
                    <TooltipContent side="right">
                      Logout
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
