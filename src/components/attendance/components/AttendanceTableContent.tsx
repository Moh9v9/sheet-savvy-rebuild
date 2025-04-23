import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Attendance } from "@/services/googleSheets";
import { AttendanceTableRow } from "./AttendanceTableRow";

interface AttendanceTableContentProps {
  isLoading: boolean;
  filteredAttendance: Attendance[];
  onRowClick: (attendance: Attendance) => void;
  onEdit: (attendance: Attendance, event: React.MouseEvent) => void;
  onDelete: (attendance: Attendance, event: React.MouseEvent) => void;
}

export const AttendanceTableContent: React.FC<AttendanceTableContentProps> = ({
  isLoading,
  filteredAttendance,
  onRowClick,
  onEdit,
  onDelete,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>End Time</TableHead>
          <TableHead>Overtime</TableHead>
          <TableHead>Note</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <td colSpan={8} className="text-center py-8">
              Loading attendance data...
            </td>
          </TableRow>
        ) : filteredAttendance.length === 0 ? (
          <TableRow>
            <td colSpan={8} className="text-center py-8">
              No attendance records found
            </td>
          </TableRow>
        ) : (
          filteredAttendance.map((record) => (
            <AttendanceTableRow
              key={record.id}
              record={record}
              onRowClick={onRowClick}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
};
