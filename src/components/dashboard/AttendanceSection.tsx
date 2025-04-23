
import { Plus, RefreshCcw, Save } from "lucide-react";
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
    <div className="space-y-4 px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Daily Attendance</h2>
          <p className="text-sm text-slate-400">Manage employee attendance records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
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
