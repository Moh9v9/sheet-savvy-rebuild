
import React from "react";
import { Input } from "@/components/ui/input";
import { AttendanceStatusFilter } from "./AttendanceStatusFilter";

interface AttendanceFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-between">
      <div className="flex flex-col sm:flex-row gap-2 flex-1">
        <Input
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sm:max-w-xs"
        />
        
        <AttendanceStatusFilter 
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>
    </div>
  );
};
