
import { Plus, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import { Attendance, Employee } from "@/services/googleSheets";
import { format, addDays, subDays } from "date-fns";

interface AttendanceSectionProps {
  attendanceRecords: Attendance[];
  employees: Employee[];
  loading: boolean;
  onEdit: (date: string, employeeId: string, data: Partial<Attendance>) => Promise<void>;
  onDelete: (date: string, employeeId: string) => Promise<void>;
  onAddClick: () => void;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const AttendanceSection = ({
  attendanceRecords,
  employees,
  loading,
  onEdit,
  onDelete,
  onAddClick,
  selectedDate,
  onDateChange
}: AttendanceSectionProps) => {
  const handlePreviousDay = () => {
    onDateChange(subDays(selectedDate, 1));
  };

  const handleNextDay = () => {
    onDateChange(addDays(selectedDate, 1));
  };

  return (
    <div className="space-y-4 px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Daily Attendance</h2>
          <p className="text-sm text-muted-foreground">
            Showing records for {format(selectedDate, "EEEE, MMMM d, yyyy")}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousDay}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {format(subDays(selectedDate, 1), "EEEE")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextDay}
            >
              {format(addDays(selectedDate, 1), "EEEE")}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <Button onClick={onAddClick}>
            <Plus className="h-4 w-4 mr-2" />
            Add Attendance
          </Button>
        </div>
      </div>

      <AttendanceTable
        attendanceRecords={attendanceRecords}
        employees={employees}
        onEdit={onEdit}
        onDelete={onDelete}
        isLoading={loading}
      />
    </div>
  );
};

export default AttendanceSection;
