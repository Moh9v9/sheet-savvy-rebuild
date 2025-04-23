
import React, { useState } from "react";
import { Attendance } from "@/services/googleSheets";
import { Employee } from "@/types/employee";
import { Table, TableBody } from "@/components/ui/table";
import AttendanceDetailDrawer from "./AttendanceDetailDrawer";
import EditAttendanceModal from "./EditAttendanceModal";
import DeleteAttendanceDialog from "./DeleteAttendanceDialog";
import { AttendanceFilters } from "./components/AttendanceFilters";
import { AttendanceTableHeader } from "./components/AttendanceTableHeader";
import { AttendanceTableRows } from "./components/AttendanceTableRows";
import { useAttendanceFilters } from "@/hooks/useAttendanceFilters";

interface AttendanceTableProps {
  attendanceRecords: Attendance[];
  employees: Employee[];
  onEdit: (id: string, data: Partial<Attendance>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  attendanceRecords,
  employees,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    filterAttendance
  } = useAttendanceFilters();

  const filteredAttendance = filterAttendance(attendanceRecords);

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

  const handleStatusChange = async (record: Attendance, newStatus: string) => {
    await onEdit(record.id, { status: newStatus });
  };

  const handleEditSuccess = () => {
    setEditModalOpen(false);
  };

  const handleDeleteSuccess = () => {
    setDeleteDialogOpen(false);
  };
  
  return (
    <>
      <div className="flex flex-col gap-4">
        <AttendanceFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
        
        <div className="rounded-md border">
          <Table>
            <AttendanceTableHeader />
            <TableBody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-8">
                    Loading attendance data...
                  </td>
                </tr>
              ) : filteredAttendance.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8">
                    No attendance records found
                  </td>
                </tr>
              ) : (
                <AttendanceTableRows
                  records={filteredAttendance}
                  onRowClick={handleRowClick}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              )}
            </TableBody>
          </Table>
        </div>
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
