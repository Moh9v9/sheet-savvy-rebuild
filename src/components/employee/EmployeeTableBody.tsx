
import React from "react";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Employee } from "@/types/employee";

interface EmployeeTableBodyProps {
  employees: Employee[];
  onViewDetails: (employee: Employee) => void;
}

export function EmployeeTableBody({ employees, onViewDetails }: EmployeeTableBodyProps) {
  return (
    <TableBody>
      {!employees || employees.length === 0 ? (
        <TableRow>
          <TableCell colSpan={10} className="text-center text-muted-foreground">
            No employees found.
          </TableCell>
        </TableRow>
      ) : (
        employees.map((emp: Employee) => (
          <TableRow key={emp.id}>
            <TableCell>
              <Button
                variant="link"
                className="p-0 h-auto font-normal"
                onClick={() => onViewDetails(emp)}
              >
                {emp.fullName}
              </Button>
            </TableCell>
            <TableCell>{emp.iqamaNo}</TableCell>
            <TableCell>{emp.project}</TableCell>
            <TableCell>{emp.location}</TableCell>
            <TableCell>{emp.jobTitle}</TableCell>
            <TableCell>{emp.paymentType}</TableCell>
            <TableCell>{emp.rateOfPayment}</TableCell>
            <TableCell>{emp.sponsorship || "-"}</TableCell>
            <TableCell>
              <span
                className={cn(
                  "px-2 py-1 rounded text-xs font-medium",
                  emp.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {emp.status}
              </span>
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(emp)}
              >
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  );
}
