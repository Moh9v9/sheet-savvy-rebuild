
import React from "react";
import { Attendance } from "@/services/googleSheets";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteAttendanceDialogProps {
  attendance: Attendance | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: string) => Promise<void>;
  onSuccess: () => void;
}

const DeleteAttendanceDialog: React.FC<DeleteAttendanceDialogProps> = ({
  attendance,
  open,
  onOpenChange,
  onDelete,
  onSuccess,
}) => {
  const handleDelete = async () => {
    if (!attendance) return;
    
    try {
      await onDelete(attendance.id);
      toast.success("Attendance record deleted successfully");
      onSuccess();
    } catch (error) {
      console.error("Error deleting attendance:", error);
      toast.error("Failed to delete attendance record");
    }
  };

  if (!attendance) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Attendance Record</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the attendance record for {attendance.fullName} on {attendance.date}?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAttendanceDialog;
