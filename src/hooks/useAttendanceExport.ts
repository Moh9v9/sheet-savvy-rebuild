
import { useState } from "react";
import { Attendance } from "@/types/attendance";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { toast } from "sonner";

interface ExportFilters {
  searchQuery: string;
  statusFilter: string;
  dateFilter?: Date;
}

export const useAttendanceExport = (
  attendanceRecords: Attendance[],
  filters: ExportFilters
) => {
  const [isExporting, setIsExporting] = useState(false);

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

  const getFormattedDate = () => format(new Date(), "yyyy-MM-dd_HH-mm");

  const getCurrentDate = () => format(new Date(), "MMMM d, yyyy h:mm a");

  const exportToExcel = async () => {
    try {
      setIsExporting(true);
      const currentDate = getCurrentDate();
      const filterSummary = getFilterSummary();
      
      const headers = ["Name", "Date", "Status", "Start Time", "End Time", "Overtime", "Note"];
      const data = [
        ["Export Date:", currentDate],
        ["Filter:", filterSummary],
        [""],
        headers,
      ];
      
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
      
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(data);
      ws['!cols'] = Array(headers.length).fill({ wch: 15 });
      
      XLSX.utils.book_append_sheet(wb, ws, "Attendance");
      XLSX.writeFile(wb, `Attendance_${getFormattedDate()}.xlsx`);
      
      toast.success("Attendance data exported to Excel successfully");
    } catch (error) {
      toast.error("Failed to export attendance data to Excel");
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDF = async () => {
    try {
      setIsExporting(true);
      const doc = new jsPDF();
      const currentDate = getCurrentDate();
      const filterSummary = getFilterSummary();
      
      doc.setFontSize(18);
      doc.text("Attendance Records", 14, 20);
      
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Export Date: ${currentDate}`, 14, 30);
      doc.text(`Filter: ${filterSummary}`, 14, 36);
      
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
      
      doc.save(`Attendance_${getFormattedDate()}.pdf`);
      toast.success("Attendance data exported to PDF successfully");
    } catch (error) {
      toast.error("Failed to export attendance data to PDF");
    } finally {
      setIsExporting(false);
    }
  };

  const exportToCSV = async () => {
    try {
      setIsExporting(true);
      const currentDate = getCurrentDate();
      const filterSummary = getFilterSummary();
      
      const headers = ["Name", "Date", "Status", "Start Time", "End Time", "Overtime", "Note"];
      const data = [
        ["Export Date:", currentDate],
        ["Filter:", filterSummary],
        [""],
        headers,
      ];
      
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
      
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, "Attendance");
      XLSX.writeFile(wb, `Attendance_${getFormattedDate()}.csv`, { bookType: 'csv' });
      
      toast.success("Attendance data exported to CSV successfully");
    } catch (error) {
      toast.error("Failed to export attendance data to CSV");
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    exportToExcel,
    exportToPDF,
    exportToCSV
  };
};
