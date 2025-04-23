
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

interface ExportEmployeesButtonProps {
  employees: Employee[];
}

export function ExportEmployeesButton({ employees }: ExportEmployeesButtonProps) {
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
      const ws = XLSX.utils.aoa_to_sheet([columnHeaders, ...prepareData()]);
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
      autoTable(doc, {
        head: [columnHeaders],
        body: prepareData(),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [75, 85, 99] },
      });
      doc.save("employees.pdf");
      toast.success("Successfully exported to PDF");
    } catch (error) {
      toast.error("Failed to export to PDF");
    }
  };

  const exportToCSV = () => {
    try {
      const ws = XLSX.utils.aoa_to_sheet([columnHeaders, ...prepareData()]);
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
