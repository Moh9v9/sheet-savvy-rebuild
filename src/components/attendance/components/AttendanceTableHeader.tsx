
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AttendanceTableHeaderProps {
  onSort?: (column: string) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
}

export const AttendanceTableHeader: React.FC<AttendanceTableHeaderProps> = ({ 
  onSort,
  sortColumn,
  sortDirection
}) => {
  const columns = [
    { key: "fullName", label: "Name" },
    { key: "iqamaNumber", label: "Iqama Number" },
    { key: "project", label: "Project" },
    { key: "status", label: "Status" },
    { key: "startTime", label: "Start Time" },
    { key: "endTime", label: "End Time" },
    { key: "overtime", label: "Overtime" },
    { key: "notes", label: "Notes" },
  ];

  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) return <ArrowUpDown size={14} />;
    return sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  return (
    <TableHeader className="bg-gray-100 dark:bg-gray-800">
      <TableRow>
        {columns.map((column) => (
          <TableHead 
            key={column.key} 
            className={cn(
              "dark:text-gray-300",
              onSort ? "cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors" : ""
            )}
            onClick={onSort ? () => onSort(column.key) : undefined}
          >
            {onSort ? (
              <div className="flex items-center gap-1">
                {column.label}
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0 hover:bg-transparent">
                  {getSortIcon(column.key)}
                </Button>
              </div>
            ) : (
              column.label
            )}
          </TableHead>
        ))}
        <TableHead className="text-right dark:text-gray-300">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};
