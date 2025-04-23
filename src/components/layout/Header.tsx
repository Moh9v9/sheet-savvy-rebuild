
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b py-3 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </Button>
        <h1 className="text-xl font-semibold text-gray-800">Sheet Savvy</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          Help
        </Button>
        <Button size="sm">Connect Sheet</Button>
      </div>
    </header>
  );
};

export default Header;
