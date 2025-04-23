
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AttendanceStatusFilterProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const AttendanceStatusFilter: React.FC<AttendanceStatusFilterProps> = ({
  statusFilter,
  setStatusFilter,
}) => {
  const statuses = [
    { value: "all", label: "All Statuses" },
    { value: "present", label: "Present" },
    { value: "absent", label: "Absent" },
    { value: "late", label: "Late" },
    { value: "leave", label: "Leave" },
  ];

  return (
    <Select value={statusFilter} onValueChange={setStatusFilter}>
      <SelectTrigger className="sm:max-w-[150px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
