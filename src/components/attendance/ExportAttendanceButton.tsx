
import React from "react";
import { Attendance } from "@/types/attendance";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAttendanceExport } from "@/hooks/useAttendanceExport";

interface ExportAttendanceButtonProps {
  attendanceRecords: Attendance[];
  filters: {
    searchQuery: string;
    statusFilter: string;
    dateFilter?: Date;
  };
}

const ExportAttendanceButton: React.FC<ExportAttendanceButtonProps> = ({
  attendanceRecords,
  filters,
}) => {
  const { isExporting, exportToExcel, exportToPDF, exportToCSV } = useAttendanceExport(
    attendanceRecords,
    filters
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          disabled={isExporting || attendanceRecords.length === 0}
          className="flex items-center gap-1"
        >
          <FileDown className="h-4 w-4 mr-1" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToExcel}>
          Export to Excel (.xlsx)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToPDF}>
          Export to PDF (.pdf)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToCSV}>
          Export to CSV (.csv)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportAttendanceButton;
