
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";

const DashboardHeader = () => {
  const { user } = useAuth();
  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM d, yyyy");
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-800/50 backdrop-blur-sm">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-gradient">
          Dashboard
        </h1>
        <p className="text-slate-400">
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
