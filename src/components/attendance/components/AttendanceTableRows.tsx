
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { format, isValid, parseISO } from "date-fns";
import { Attendance } from "@/services/googleSheets";
import { AttendanceStatusDot } from "./AttendanceStatusDot";
import { AttendanceStatusBadge } from "./AttendanceStatusBadge";
import { AttendanceTableActions } from "./AttendanceTableActions";

interface AttendanceTableRowsProps {
  records: Attendance[];
  onRowClick: (record: Attendance) => void;
  onEdit: (record: Attendance, event: React.MouseEvent) => void;
  onDelete: (record: Attendance, event: React.MouseEvent) => void;
  onStatusChange: (record: Attendance, newStatus: string) => void;
}

export const AttendanceTableRows: React.FC<AttendanceTableRowsProps> = ({
  records,
  onRowClick,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  const safeFormatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, "MMM d, yyyy") : "Invalid date";
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <>
      {records.map((record) => (
        <TableRow 
          key={record.id} 
          onClick={() => onRowClick(record)}
          className="cursor-pointer"
        >
          <TableCell className="font-medium">
            <div className="flex items-center gap-2">
              <AttendanceStatusDot 
                status={record.status} 
                onChange={(newStatus) => onStatusChange(record, newStatus)}
                showToggle
              />
              {record.fullName}
            </div>
          </TableCell>
          <TableCell>{safeFormatDate(record.date)}</TableCell>
          <TableCell>
            <AttendanceStatusBadge 
              status={record.status}
              onChange={(newStatus) => onStatusChange(record, newStatus)}
            />
          </TableCell>
          <TableCell>{record.start_time || "N/A"}</TableCell>
          <TableCell>{record.end_time || "N/A"}</TableCell>
          <TableCell>{record.overtime || "N/A"}</TableCell>
          <TableCell className="truncate max-w-[150px]">{record.note || "N/A"}</TableCell>
          <TableCell className="text-right">
            <AttendanceTableActions
              record={record}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
