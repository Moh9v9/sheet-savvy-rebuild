
import React from "react";
import { format, isValid, parseISO } from "date-fns";
import { Attendance } from "@/services/googleSheets";
import { TableCell, TableRow } from "@/components/ui/table";
import { AttendanceStatusBadge } from "./AttendanceStatusBadge";
import { AttendanceActionButtons } from "./AttendanceActionButtons";
import { AttendanceStatusDot } from "./AttendanceStatusDot";

interface AttendanceTableRowProps {
  record: Attendance;
  onRowClick: (record: Attendance) => void;
  onEdit: (record: Attendance, event: React.MouseEvent) => void;
  onDelete: (record: Attendance, event: React.MouseEvent) => void;
}

export const AttendanceTableRow: React.FC<AttendanceTableRowProps> = ({
  record,
  onRowClick,
  onEdit,
  onDelete,
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
    <TableRow 
      onClick={() => onRowClick(record)}
      className="cursor-pointer"
    >
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <AttendanceStatusDot status={record.status} />
          {record.fullName}
        </div>
      </TableCell>
      <TableCell>{safeFormatDate(record.date)}</TableCell>
      <TableCell>
        <AttendanceStatusBadge status={record.status} />
      </TableCell>
      <TableCell>{record.start_time || "N/A"}</TableCell>
      <TableCell>{record.end_time || "N/A"}</TableCell>
      <TableCell>{record.overtime || "N/A"}</TableCell>
      <TableCell className="truncate max-w-[150px]">{record.note || "N/A"}</TableCell>
      <TableCell className="text-right">
        <AttendanceActionButtons 
          record={record}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
};
