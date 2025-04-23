
import React, { useState } from "react";
import { Attendance } from "@/services/googleSheets";
import { TableCell, TableRow } from "@/components/ui/table";
import { AttendanceStatusBadge } from "./AttendanceStatusBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(record);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaving(true);
    await onEdit(editedData, e);
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditedData(record);
    setIsEditing(false);
  };

  return (
    <TableRow onClick={() => !isEditing && onRowClick(record)}>
      <TableCell className="font-medium">
        {record.fullName}
      </TableCell>
      <TableCell>{record.date}</TableCell>
      <TableCell>
        {isEditing ? (
          <select
            className="w-24 rounded-md border p-1"
            value={editedData.status}
            onChange={(e) => setEditedData({ ...editedData, status: e.target.value })}
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
            <option value="leave">Leave</option>
          </select>
        ) : (
          <AttendanceStatusBadge status={record.status} />
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            type="time"
            value={editedData.start_time || ""}
            onChange={(e) => setEditedData({ ...editedData, start_time: e.target.value })}
            className="w-24"
          />
        ) : (
          record.start_time || "N/A"
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            type="time"
            value={editedData.end_time || ""}
            onChange={(e) => setEditedData({ ...editedData, end_time: e.target.value })}
            className="w-24"
          />
        ) : (
          record.end_time || "N/A"
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            type="number"
            value={editedData.overtime || ""}
            onChange={(e) => setEditedData({ ...editedData, overtime: e.target.value })}
            className="w-20"
          />
        ) : (
          record.overtime || "N/A"
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            value={editedData.note || ""}
            onChange={(e) => setEditedData({ ...editedData, note: e.target.value })}
            className="w-full"
          />
        ) : (
          record.note || "N/A"
        )}
      </TableCell>
      <TableCell className="text-right">
        {isEditing ? (
          <div className="flex justify-end gap-1">
            {isSaving ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSave}
                  className="text-green-500 hover:text-green-600"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            Edit
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};
