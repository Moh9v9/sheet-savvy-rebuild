
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className={cn("flex-1 flex flex-col transition-all", 
        sidebarOpen ? "md:ml-64" : "md:ml-20"
      )}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
        <footer className="py-4 px-6 text-center text-gray-600 text-sm border-t">
          &copy; {new Date().getFullYear()} Sheet Savvy
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
