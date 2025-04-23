
import { Card } from "@/components/ui/card";
import { AttendanceStats } from "@/hooks/useAttendanceData";

interface StatsCardsProps {
  stats: AttendanceStats;
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">Total Records</span>
          <span className="text-2xl font-bold">{stats.total}</span>
        </div>
      </Card>
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">Present</span>
          <span className="text-2xl font-bold text-green-600">{stats.present}</span>
        </div>
      </Card>
      <Card className="p-4 bg-red-50 border-red-200">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">Absent</span>
          <span className="text-2xl font-bold text-red-600">{stats.absent}</span>
        </div>
      </Card>
      <Card className="p-4 bg-orange-50 border-orange-200">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">Late</span>
          <span className="text-2xl font-bold text-orange-600">{stats.late}</span>
        </div>
      </Card>
    </div>
  );
};

export default StatsCards;
