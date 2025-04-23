
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Employee } from "@/types/employee";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";
import { format } from "date-fns";

interface ExportEmployeesButtonProps {
  employees: Employee[];
  filters: {
    search: string;
    status: string;
    project: string;
    paymentType: string;
    jobTitle: string;
    sponsorship: string;
  };
}

export function ExportEmployeesButton({ employees, filters }: ExportEmployeesButtonProps) {
  const columnHeaders = [
    "Full Name",
    "Iqama No",
    "Project",
    "Location",
    "Job Title",
    "Payment Type",
    "Rate of Payment",
    "Sponsorship",
    "Status",
  ];

  const getFilterSummary = () => {
    const activeFilters = [];
    if (filters.status !== "All") activeFilters.push(`Status: ${filters.status}`);
    if (filters.project !== "All Projects") activeFilters.push(`Project: ${filters.project}`);
    if (filters.paymentType !== "All") activeFilters.push(`Payment Type: ${filters.paymentType}`);
    if (filters.jobTitle !== "All Job Titles") activeFilters.push(`Job Title: ${filters.jobTitle}`);
    if (filters.sponsorship !== "All Sponsors") activeFilters.push(`Sponsorship: ${filters.sponsorship}`);
    if (filters.search) activeFilters.push(`Search: "${filters.search}"`);
    
    return activeFilters.length > 0 
      ? activeFilters.join(" | ")
      : "All Employees";
  };

  const getExportTimestamp = () => {
    return format(new Date(), "PPpp");
  };

  const prepareData = () => {
    return employees.map((emp) => [
      emp.fullName,
      emp.iqamaNo,
      emp.project,
      emp.location,
      emp.jobTitle,
      emp.paymentType,
      emp.rateOfPayment,
      emp.sponsorship || "-",
      emp.status,
    ]);
  };

  const exportToExcel = () => {
    try {
      const timestamp = getExportTimestamp();
      const filterSummary = getFilterSummary();
      
      // Create worksheet with headers
      const ws = XLSX.utils.aoa_to_sheet([
        [`Export Date: ${timestamp}`],
        [filterSummary],
        [], // Empty row for spacing
        columnHeaders,
        ...prepareData()
      ]);

      // Style the header rows
      ws['!rows'] = [{ hidden: false }, { hidden: false }, { hidden: false }];
      
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Employees");
      XLSX.writeFile(wb, "employees.xlsx");
      toast.success("Successfully exported to Excel");
    } catch (error) {
      toast.error("Failed to export to Excel");
    }
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      const timestamp = getExportTimestamp();
      const filterSummary = getFilterSummary();

      // Add timestamp and filter summary
      doc.setFontSize(10);
      doc.text(`Export Date: ${timestamp}`, 14, 10);
      doc.text(filterSummary, 14, 16);

      autoTable(doc, {
        head: [columnHeaders],
        body: prepareData(),
        startY: 25,
        styles: { fontSize: 8 },
        headStyles: { 
          fillColor: [75, 85, 99],
          fontStyle: 'bold'
        },
      });
      
      doc.save("employees.pdf");
      toast.success("Successfully exported to PDF");
    } catch (error) {
      toast.error("Failed to export to PDF");
    }
  };

  const exportToCSV = () => {
    try {
      const timestamp = getExportTimestamp();
      const filterSummary = getFilterSummary();
      
      // Create CSV content with timestamp and filter summary
      const csvContent = [
        [`Export Date: ${timestamp}`],
        [filterSummary],
        [], // Empty row for spacing
        columnHeaders,
        ...prepareData()
      ];

      const ws = XLSX.utils.aoa_to_sheet(csvContent);
      const csv = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "employees.csv";
      link.click();
      toast.success("Successfully exported to CSV");
    } catch (error) {
      toast.error("Failed to export to CSV");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={exportToExcel}>Export as Excel</DropdownMenuItem>
        <DropdownMenuItem onClick={exportToPDF}>Export as PDF</DropdownMenuItem>
        <DropdownMenuItem onClick={exportToCSV}>Export as CSV</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
