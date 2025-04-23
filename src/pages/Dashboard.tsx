
import { useState } from "react";
import { useAttendanceData } from "@/hooks/useAttendanceData";
import { Attendance } from "@/services/googleSheets";
import AddAttendanceModal from "@/components/attendance/AddAttendanceModal";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import AttendanceSection from "@/components/dashboard/AttendanceSection";

const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    attendanceRecords,
    employees,
    stats,
    loading,
    addAttendanceRecord,
    editAttendanceRecord,
    deleteAttendanceRecord,
    refreshData
  } = useAttendanceData(selectedDate);

  const handleAddSuccess = () => {
    setModalOpen(false);
  };

  const handleEditAttendance = async (id: string, data: Partial<Attendance>) => {
    await editAttendanceRecord(id, data);
  };

  const handleDeleteAttendance = async (id: string) => {
    await deleteAttendanceRecord(id);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
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
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
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
