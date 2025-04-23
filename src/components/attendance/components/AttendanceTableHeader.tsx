
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const AttendanceTableHeader: React.FC = () => {
  return (
    <TableHeader className="bg-gray-100 dark:bg-gray-800">
      <TableRow>
        <TableHead className="dark:text-gray-300">Name</TableHead>
        <TableHead className="dark:text-gray-300">Iqama Number</TableHead>
        <TableHead className="dark:text-gray-300">Project</TableHead>
        <TableHead className="dark:text-gray-300">Status</TableHead>
        <TableHead className="dark:text-gray-300">Start Time</TableHead>
        <TableHead className="dark:text-gray-300">End Time</TableHead>
        <TableHead className="dark:text-gray-300">Overtime</TableHead>
        <TableHead className="dark:text-gray-300">Notes</TableHead>
        <TableHead className="text-right dark:text-gray-300">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};
