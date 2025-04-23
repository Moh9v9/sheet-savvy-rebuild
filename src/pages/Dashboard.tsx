
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAttendanceData } from "@/hooks/useAttendanceData";
import { Plus } from "lucide-react";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import AddAttendanceModal from "@/components/attendance/AddAttendanceModal";
import ExportAttendanceButton from "@/components/attendance/ExportAttendanceButton";
import { Attendance } from "@/services/googleSheets";

const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  
  const {
    attendanceRecords,
    employees,
    stats,
    loading,
    addAttendanceRecord,
    editAttendanceRecord,
    deleteAttendanceRecord
  } = useAttendanceData();

  const handleAddSuccess = () => {
    setModalOpen(false);
  };

  // Create wrapper functions that convert Promise<boolean> to Promise<void>
  const handleEditAttendance = async (id: string, data: Partial<Attendance>) => {
    await editAttendanceRecord(id, data);
    // Return type is void
  };

  const handleDeleteAttendance = async (id: string) => {
    await deleteAttendanceRecord(id);
    // Return type is void
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the attendance management system
          </p>
        </div>
      </div>

      {/* Attendance Stats */}
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

      {/* Attendance Table Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Attendance Records</h2>
          <div className="flex gap-2">
            <ExportAttendanceButton
              attendanceRecords={attendanceRecords}
              filters={{ searchQuery, statusFilter, dateFilter }}
            />
            <Button onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Attendance
            </Button>
          </div>
        </div>

        <AttendanceTable
          attendanceRecords={attendanceRecords}
          employees={employees}
          onEdit={handleEditAttendance}
          onDelete={handleDeleteAttendance}
          isLoading={loading}
        />
      </div>

      <AddAttendanceModal
        open={isModalOpen}
        onOpenChange={setModalOpen}
        employees={employees}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
};

export default Dashboard;
