
import React from "react";
import { Attendance } from "@/services/googleSheets";
import { TableCell, TableRow } from "@/components/ui/table";
import { AttendanceStatusBadge } from "./AttendanceStatusBadge";
import { AttendanceActionButtons } from "./AttendanceActionButtons";
import { AttendanceStatusDot } from "./AttendanceStatusDot";
import { safeFormatDate } from "@/utils/dateUtils";

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
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <AttendanceStatusDot status={record.status} />
          <button 
            onClick={() => onRowClick(record)} 
            className="hover:underline text-left focus:outline-none text-primary"
          >
            {record.fullName}
          </button>
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

