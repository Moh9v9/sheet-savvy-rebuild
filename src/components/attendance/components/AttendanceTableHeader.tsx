
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const AttendanceTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Start Time</TableHead>
        <TableHead>End Time</TableHead>
        <TableHead>Overtime</TableHead>
        <TableHead>Note</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};
