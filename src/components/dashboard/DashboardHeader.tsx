
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";

const DashboardHeader = () => {
  const { user } = useAuth();
  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM d, yyyy");
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 bg-slate-800/50 border-b border-slate-700">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="text-slate-400 text-lg">
          Welcome back, {user?.name || "Guest"}
        </p>
      </div>
      <div className="text-sm md:text-base text-slate-300 font-medium">
        {formattedDate}
      </div>
    </div>
  );
};

export default DashboardHeader;
