
import { MenuIcon, XIcon, Download, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 py-3 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </Button>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Sheet Savvy</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
          <Bell size={20} />
        </Button>
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-600 text-white">JS</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline text-sm font-medium dark:text-gray-300">John Smith</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
