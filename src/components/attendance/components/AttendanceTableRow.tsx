
import React, { useState } from "react";
import { Attendance } from "@/services/googleSheets";
import { TableCell, TableRow } from "@/components/ui/table";
import { AttendanceStatusBadge } from "./AttendanceStatusBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AttendanceStatus } from "@/types/attendance";
import { Switch } from "@/components/ui/switch";

interface AttendanceTableRowProps {
  record: Attendance;
  onRowClick: (record: Attendance) => void;
  onEdit: (record: Attendance, event: React.MouseEvent) => void;
}

export const AttendanceTableRow: React.FC<AttendanceTableRowProps> = ({
  record,
  onRowClick,
  onEdit,
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

  const handleAttendanceToggle = (checked: boolean) => {
    const newStatus: AttendanceStatus = checked ? 'present' : 'absent';
    setEditedData({ ...editedData, status: newStatus });
  };

  const isAttendancePresent = editedData.status === 'present' || editedData.status === 'حاضر';

  return (
    <TableRow onClick={() => !isEditing && onRowClick(record)}>
      <TableCell className="font-medium">
        {record.fullName}
      </TableCell>
      <TableCell>{record.date}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Switch
            checked={isAttendancePresent}
            onCheckedChange={handleAttendanceToggle}
            disabled={!isEditing}
          />
          <AttendanceStatusBadge status={editedData.status} />
        </div>
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
      <TableCell className="relative">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editedData.note || ""}
              onChange={(e) => setEditedData({ ...editedData, note: e.target.value })}
              className="w-full"
            />
            <div className="flex gap-1 absolute right-2">
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
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <span>{record.note || "N/A"}</span>
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
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};
