
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import ExportAttendanceButton from "@/components/attendance/ExportAttendanceButton";
import { Attendance } from "@/services/googleSheets";
import { Employee } from "@/types/employee";

interface AttendanceSectionProps {
  attendanceRecords: Attendance[];
  employees: Employee[];
  loading: boolean;
  onEdit: (id: string, data: Partial<Attendance>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onAddClick: () => void;
}

const AttendanceSection = ({
  attendanceRecords,
  employees,
  loading,
  onEdit,
  onDelete,
  onAddClick
}: AttendanceSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Attendance Records</h2>
        <div className="flex gap-2">
          <ExportAttendanceButton
            attendanceRecords={attendanceRecords}
            filters={{
              searchQuery: "",
              statusFilter: "all",
              dateFilter: undefined
            }}
          />
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
