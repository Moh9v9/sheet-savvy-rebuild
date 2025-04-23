
import { Card } from "@/components/ui/card";
import { Users, UserCheck, UserX } from "lucide-react";
import { AttendanceStats } from "@/hooks/useAttendanceData";

interface StatsCardsProps {
  stats: AttendanceStats;
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid gap-4 px-6 md:grid-cols-3">
      <StatsCard 
        label="Total Employees"
        value={stats.total}
        Icon={Users}
        className="border-blue-500/20"
        iconClassName="text-blue-500"
      />
      <StatsCard 
        label="Present Today"
        value={stats.present}
        Icon={UserCheck}
        className="border-green-500/20"
        iconClassName="text-green-500"
      />
      <StatsCard 
        label="Absent Today"
        value={stats.absent}
        Icon={UserX}
        className="border-red-500/20"
        iconClassName="text-red-500"
      />
    </div>
  );
};

interface StatsCardProps {
  label: string;
  value: number;
  Icon: React.ElementType;
  className?: string;
  iconClassName?: string;
}

const StatsCard = ({ label, value, Icon, className, iconClassName }: StatsCardProps) => {
  return (
    <Card className={`p-4 flex items-start gap-4 bg-card/50 border-2 glass-morphism ${className}`}>
      <div className={`p-2 rounded-md bg-background/60 ${iconClassName}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="space-y-0.5">
        <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </Card>
  );
};

export default StatsCards;
