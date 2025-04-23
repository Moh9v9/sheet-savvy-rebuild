
import React, { useState } from "react";
import { Attendance } from "@/services/googleSheets";
import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Loader } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AttendanceStatus } from "@/types/attendance";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(record);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaving(true);
    try {
      await onEdit(editedData, e);
      toast.success("Attendance record updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update attendance record");
      console.error("Error updating attendance:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAttendanceToggle = (checked: boolean) => {
    const newStatus: AttendanceStatus = checked ? 'present' : 'absent';
    setEditedData({ ...editedData, status: newStatus });
    setIsEditing(true);
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
            className={cn(
              "transition-all duration-300",
              isAttendancePresent 
                ? "data-[state=checked]:bg-green-500" 
                : "data-[state=unchecked]:bg-red-500"
            )}
          />
          <div className={cn(
            "font-medium text-sm px-2 py-1 rounded-full",
            isAttendancePresent 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          )}>
            {isAttendancePresent ? "Present" : "Absent"}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Input
          type="time"
          value={editedData.start_time || ""}
          onChange={(e) => {
            setEditedData({ ...editedData, start_time: e.target.value });
            setIsEditing(true);
          }}
          className="w-24"
        />
      </TableCell>
      <TableCell>
        <Input
          type="time"
          value={editedData.end_time || ""}
          onChange={(e) => {
            setEditedData({ ...editedData, end_time: e.target.value });
            setIsEditing(true);
          }}
          className="w-24"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={editedData.overtime || ""}
          onChange={(e) => {
            setEditedData({ ...editedData, overtime: e.target.value });
            setIsEditing(true);
          }}
          className="w-20"
        />
      </TableCell>
      <TableCell className="relative">
        <div className="flex items-center gap-2">
          <Input
            value={editedData.note || ""}
            onChange={(e) => {
              setEditedData({ ...editedData, note: e.target.value });
              setIsEditing(true);
            }}
            className="w-full"
          />
          {isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="min-w-20"
            >
              {isSaving ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4 text-green-500" />
              )}
              {isSaving ? "Saving..." : "Save"}
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};
