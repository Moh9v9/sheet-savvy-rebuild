
import React from "react";
import { Attendance } from "@/services/googleSheets";
import { Employee } from "@/services/googleSheets";
import { AttendanceTableContent } from "./components/AttendanceTableContent";
import AttendanceDetailDrawer from "./AttendanceDetailDrawer";
import EditAttendanceModal from "./EditAttendanceModal";
import DeleteAttendanceDialog from "./DeleteAttendanceDialog";
import { useAttendanceTable } from "./hooks/useAttendanceTable";

interface AttendanceTableProps {
  attendanceRecords: Attendance[];
  employees: Employee[];
  onEdit: (date: string, employeeId: string, data: Partial<Attendance>) => Promise<void>;
  onDelete: (date: string, employeeId: string) => Promise<void>;
  isLoading?: boolean;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  attendanceRecords,
  employees,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  const {
    selectedAttendance,
    setSelectedAttendance,
    detailsOpen,
    setDetailsOpen,
    editModalOpen,
    setEditModalOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    filteredAttendance
  } = useAttendanceTable(attendanceRecords);

  const handleRowClick = (attendance: Attendance) => {
    setSelectedAttendance(attendance);
    setDetailsOpen(true);
  };

  const handleEdit = (attendance: Attendance, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedAttendance(attendance);
    setEditModalOpen(true);
  };

  const handleDelete = (attendance: Attendance, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedAttendance(attendance);
    setDeleteDialogOpen(true);
  };

  const handleEditSuccess = async () => {
    setEditModalOpen(false);
  };

  const handleDeleteSuccess = async () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="rounded-md border">
        <AttendanceTableContent
          isLoading={isLoading}
          filteredAttendance={attendanceRecords}
          onRowClick={handleRowClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      
      <AttendanceDetailDrawer
        attendance={selectedAttendance}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
      
      <EditAttendanceModal
        attendance={selectedAttendance}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        employees={employees}
        onSuccess={handleEditSuccess}
      />
      
      <DeleteAttendanceDialog
        attendance={selectedAttendance}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDelete={onDelete}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
};

export default AttendanceTable;
