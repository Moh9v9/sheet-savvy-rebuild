
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface EmployeeSearchFilterProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const statusOptions = ["All", "Active", "Archived"];

export function EmployeeSearchFilter({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: EmployeeSearchFilterProps) {
  return (
    <div className="mb-6 flex flex-col md:flex-row items-center gap-4 justify-between">
      <h2 className="text-2xl font-semibold text-gradient-primary">
        Employees
      </h2>
      <div className="flex gap-2 w-full md:w-auto">
        <div className="relative w-full md:w-64">
          <span className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">
            <Search className="w-5 h-5" />
          </span>
          <Input
            className="pl-10 pr-4 bg-background border-muted"
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or Iqama No"
            aria-label="Search employees"
          />
        </div>
        <div className="ml-0 md:ml-2">
          <select
            className="h-10 px-3 rounded-md border border-muted bg-background text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filter by status"
          >
            {statusOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
