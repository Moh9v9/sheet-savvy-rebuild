
import React from "react";
import { format, isValid, parseISO } from "date-fns";
import { Attendance } from "@/services/googleSheets";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CircleDot, Pencil, Trash2 } from "lucide-react";

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

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-orange-100 text-orange-800';
      case 'leave':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <TableRow 
      onClick={() => onRowClick(record)}
      className="cursor-pointer"
    >
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <CircleDot 
            className={`h-3 w-3 ${record.status === 'present' ? 'text-green-500' : 
                            record.status === 'absent' ? 'text-red-500' : 
                            record.status === 'late' ? 'text-orange-500' : 'text-blue-500'}`} 
          />
          {record.fullName}
        </div>
      </TableCell>
      <TableCell>{safeFormatDate(record.date)}</TableCell>
      <TableCell>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(record.status)}`}>
          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
        </span>
      </TableCell>
      <TableCell>{record.start_time || "N/A"}</TableCell>
      <TableCell>{record.end_time || "N/A"}</TableCell>
      <TableCell>{record.overtime || "N/A"}</TableCell>
      <TableCell className="truncate max-w-[150px]">{record.note || "N/A"}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => onEdit(record, e)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600"
            onClick={(e) => onDelete(record, e)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
