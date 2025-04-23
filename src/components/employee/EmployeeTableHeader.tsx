
import React from "react";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

export function EmployeeTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Full Name</TableHead>
        <TableHead>Iqama No</TableHead>
        <TableHead>Project</TableHead>
        <TableHead>Location</TableHead>
        <TableHead>Job Title</TableHead>
        <TableHead>Payment Type</TableHead>
        <TableHead>Rate of Payment</TableHead>
        <TableHead>Sponsorship</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
