
import React from "react";
import { format } from "date-fns";
import { Attendance } from "@/services/googleSheets";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface AttendanceDetailDrawerProps {
  attendance: Attendance | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AttendanceDetailDrawer: React.FC<AttendanceDetailDrawerProps> = ({
  attendance,
  open,
  onOpenChange,
}) => {
  if (!attendance) return null;
  
  // Format date for better readability
  const formattedDate = attendance.date ? format(new Date(attendance.date), "MMMM d, yyyy") : "N/A";
  const createdAt = attendance.created_at ? format(new Date(attendance.created_at), "MMMM d, yyyy h:mm a") : "N/A";
  const updatedAt = attendance.updated_at ? format(new Date(attendance.updated_at), "MMMM d, yyyy h:mm a") : "N/A";

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-2xl mx-auto">
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold">
              Attendance Details
            </DrawerTitle>
            <DrawerDescription>
              Viewing complete attendance information
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <h4 className="text-sm font-medium text-muted-foreground">Employee Name</h4>
                <p className="text-sm">{attendance.fullName}</p>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                <p className="text-sm">{formattedDate}</p>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-medium text-muted-foreground">Start Time</h4>
                <p className="text-sm">{attendance.start_time || "N/A"}</p>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-medium text-muted-foreground">End Time</h4>
                <p className="text-sm">{attendance.end_time || "N/A"}</p>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                <p className="text-sm">{attendance.status}</p>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-medium text-muted-foreground">Overtime</h4>
                <p className="text-sm">{attendance.overtime || "N/A"}</p>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-medium text-muted-foreground">Employee ID</h4>
                <p className="text-sm">{attendance.employee_id}</p>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-medium text-muted-foreground">Record ID</h4>
                <p className="text-sm">{attendance.id}</p>
              </div>
              <div className="space-y-1.5 col-span-full">
                <h4 className="text-sm font-medium text-muted-foreground">Note</h4>
                <p className="text-sm">{attendance.note || "No notes available"}</p>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-medium text-muted-foreground">Created At</h4>
                <p className="text-sm">{createdAt}</p>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-medium text-muted-foreground">Updated At</h4>
                <p className="text-sm">{updatedAt}</p>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AttendanceDetailDrawer;
