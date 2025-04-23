
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";

const DashboardHeader = () => {
  const { user } = useAuth();
  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM d, yyyy");
  
  // Get display name from user object (firstName + lastName, or just firstName, or email)
  const displayName = user ? (user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email) : "Guest";
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 bg-card/50 border-b border-border">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Welcome back, {displayName}
        </p>
      </div>
      <div className="text-sm md:text-base text-foreground/80 font-medium">
        {formattedDate}
      </div>
    </div>
  );
};

export default DashboardHeader;
