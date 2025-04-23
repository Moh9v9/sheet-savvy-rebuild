
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Attendance } from "@/services/googleSheets";

interface AttendanceActionButtonsProps {
  record: Attendance;
  onEdit: (record: Attendance, event: React.MouseEvent) => void;
  onDelete: (record: Attendance, event: React.MouseEvent) => void;
}

export const AttendanceActionButtons: React.FC<AttendanceActionButtonsProps> = ({
  record,
  onEdit,
  onDelete,
}) => {
  return (
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
  );
};
