
import { ArrowLeft, ArrowRight, CalendarIcon } from "lucide-react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import { Attendance, Employee } from "@/services/googleSheets";
import { format } from "date-fns";

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
  onDateChange,
}: AttendanceSectionProps) => {
  const goToPreviousDay = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    onDateChange(prevDate);
  };

  const goToNextDay = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    onDateChange(nextDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="space-y-4 px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Daily Attendance</h2>
          <p className="text-sm text-muted-foreground">
            Manage employee attendance records
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={onAddClick}>
            <Plus className="h-4 w-4 mr-2" />
            Add Attendance
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 pb-4">
        <Button 
          variant="secondary" 
          className="px-4 py-2"
          onClick={goToToday}
        >
          Today
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPreviousDay}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNextDay}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <span className="text-sm font-medium">
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </span>
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateChange}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <AttendanceTable
        attendanceRecords={attendanceRecords}
        employees={employees}
        onEdit={onEdit}
        onDelete={onDelete}
        isLoading={loading}
        defaultDateFilter={selectedDate}
      />
    </div>
  );
};

export default AttendanceSection;
