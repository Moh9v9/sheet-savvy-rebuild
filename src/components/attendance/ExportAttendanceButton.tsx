
import React, { useState } from "react";
import { Attendance } from "@/services/googleSheets";
import { Button } from "@/components/ui/button";
import { Download, FileDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

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
  const [isExporting, setIsExporting] = useState(false);

  // Get filter summary text
  const getFilterSummary = () => {
    const parts = [];
    
    if (filters.searchQuery) {
      parts.push(`Search: "${filters.searchQuery}"`);
    }
    
    if (filters.statusFilter && filters.statusFilter !== "all") {
      parts.push(`Status: ${filters.statusFilter.charAt(0).toUpperCase() + filters.statusFilter.slice(1)}`);
    }
    
    if (filters.dateFilter) {
      parts.push(`Date: ${format(filters.dateFilter, "MMM d, yyyy")}`);
    }
    
    return parts.length > 0 ? parts.join(", ") : "All Attendance Records";
  };

  // Format date for export file name
  const getFormattedDate = () => {
    return format(new Date(), "yyyy-MM-dd_HH-mm");
  };

  // Export to Excel
  const exportToExcel = () => {
    try {
      setIsExporting(true);
      
      // Get current date and time
      const currentDate = format(new Date(), "MMMM d, yyyy h:mm a");
      const filterSummary = getFilterSummary();
      
      // Prepare the headers and data
      const headers = ["Name", "Date", "Status", "Start Time", "End Time", "Overtime", "Note"];
      
      // Add metadata rows (date and filter summary)
      const data = [
        ["Export Date:", currentDate],
        ["Filter:", filterSummary],
        [""], // Empty row as separator
        headers, // Column headers
      ];
      
      // Add attendance records
      attendanceRecords.forEach(record => {
        data.push([
          record.fullName,
          format(new Date(record.date), "MMM d, yyyy"),
          record.status,
          record.start_time || "",
          record.end_time || "",
          record.overtime || "",
          record.note || "",
        ]);
      });
      
      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(data);
      
      // Style the header row (bold)
      const headerRow = String.fromCharCode(65 + headers.length - 1);
      ws['!cols'] = Array(headers.length).fill({ wch: 15 });
      
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, "Attendance");
      
      // Generate Excel file
      XLSX.writeFile(wb, `Attendance_${getFormattedDate()}.xlsx`);
      
      toast.success("Attendance data exported to Excel successfully");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Failed to export attendance data to Excel");
    } finally {
      setIsExporting(false);
    }
  };

  // Export to PDF
  const exportToPDF = () => {
    try {
      setIsExporting(true);
      
      // Create PDF document
      const doc = new jsPDF();
      
      // Get current date and time
      const currentDate = format(new Date(), "MMMM d, yyyy h:mm a");
      const filterSummary = getFilterSummary();
      
      // Add title
      doc.setFontSize(18);
      doc.text("Attendance Records", 14, 20);
      
      // Add metadata
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Export Date: ${currentDate}`, 14, 30);
      doc.text(`Filter: ${filterSummary}`, 14, 36);
      
      // Prepare table data
      const tableColumn = ["Name", "Date", "Status", "Start Time", "End Time", "Overtime", "Note"];
      const tableRows = attendanceRecords.map(record => [
        record.fullName,
        format(new Date(record.date), "MMM d, yyyy"),
        record.status,
        record.start_time || "",
        record.end_time || "",
        record.overtime || "",
        record.note || "",
      ]);
      
      // Generate table
      autoTable(doc, {
        startY: 45,
        head: [tableColumn],
        body: tableRows,
        headStyles: {
          fillColor: [66, 139, 202],
          textColor: 255
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        },
        styles: {
          fontSize: 10
        }
      });
      
      // Save the PDF
      doc.save(`Attendance_${getFormattedDate()}.pdf`);
      
      toast.success("Attendance data exported to PDF successfully");
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      toast.error("Failed to export attendance data to PDF");
    } finally {
      setIsExporting(false);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    try {
      setIsExporting(true);
      
      // Get current date and time
      const currentDate = format(new Date(), "MMMM d, yyyy h:mm a");
      const filterSummary = getFilterSummary();
      
      // Prepare the headers and data
      const headers = ["Name", "Date", "Status", "Start Time", "End Time", "Overtime", "Note"];
      
      // Add metadata rows (date and filter summary)
      const data = [
        ["Export Date:", currentDate],
        ["Filter:", filterSummary],
        [""], // Empty row as separator
        headers, // Column headers
      ];
      
      // Add attendance records
      attendanceRecords.forEach(record => {
        data.push([
          record.fullName,
          format(new Date(record.date), "MMM d, yyyy"),
          record.status,
          record.start_time || "",
          record.end_time || "",
          record.overtime || "",
          record.note || "",
        ]);
      });
      
      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(data);
      
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, "Attendance");
      
      // Generate CSV file
      XLSX.writeFile(wb, `Attendance_${getFormattedDate()}.csv`, { bookType: 'csv' });
      
      toast.success("Attendance data exported to CSV successfully");
    } catch (error) {
      console.error("Error exporting to CSV:", error);
      toast.error("Failed to export attendance data to CSV");
    } finally {
      setIsExporting(false);
    }
  };

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
