
import { useState } from "react";
import { useAttendanceData } from "@/hooks/useAttendanceData";
import { Attendance } from "@/services/googleSheets";
import AddAttendanceModal from "@/components/attendance/AddAttendanceModal";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import AttendanceSection from "@/components/dashboard/AttendanceSection";

const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);

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
  };

  const handleDeleteAttendance = async (id: string) => {
    await deleteAttendanceRecord(id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader />
      <StatsCards stats={stats} />
      <AttendanceSection
        attendanceRecords={attendanceRecords}
        employees={employees}
        loading={loading}
        onEdit={handleEditAttendance}
        onDelete={handleDeleteAttendance}
        onAddClick={() => setModalOpen(true)}
      />

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
