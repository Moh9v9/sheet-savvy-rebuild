import React, { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Employee } from "@/types/employee";
import { ExportEmployeesButton } from "./ExportEmployeesButton";

interface FilterOptions {
  search: string;
  status: string;
  project: string;
  paymentType: string;
  jobTitle: string;
  sponsorship: string;
}

interface EmployeeSearchFilterProps {
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string) => void;
  onClearFilters: () => void;
  data?: Employee[];
  filteredEmployees: Employee[];
}

export function EmployeeSearchFilter({
  filters,
  onFilterChange,
  onClearFilters,
  data = [],
  filteredEmployees,
}: EmployeeSearchFilterProps) {
  // Extract unique values for dropdown filters
  const uniqueValues = useMemo(() => {
    const projects = new Set<string>();
    const jobTitles = new Set<string>();
    const sponsorships = new Set<string>();

    data.forEach((employee) => {
      if (employee.project) projects.add(employee.project);
      if (employee.jobTitle) jobTitles.add(employee.jobTitle);
      if (employee.sponsorship) sponsorships.add(employee.sponsorship);
    });

    return {
      projects: Array.from(projects).sort(),
      jobTitles: Array.from(jobTitles).sort(),
      sponsorships: Array.from(sponsorships).sort(),
    };
  }, [data]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search ||
      filters.status !== "All" ||
      filters.project !== "All Projects" ||
      filters.paymentType !== "All" ||
      filters.jobTitle !== "All Job Titles" ||
      filters.sponsorship !== "All Sponsors"
    );
  }, [filters]);

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-gradient-primary">
            Employees List
          </h2>
          <ExportEmployeesButton employees={filteredEmployees} filters={filters} />
        </div>
        <div className="relative w-full md:w-64">
          <span className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">
            <Search className="w-5 h-5" />
          </span>
          <Input
            className="pl-10 pr-4 bg-background border-muted"
            type="search"
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            placeholder="Search by name or Iqama No"
            aria-label="Search employees"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {/* Project - Matches third column */}
        <Select
          value={filters.project}
          onValueChange={(value) => onFilterChange("project", value)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Projects">All Projects</SelectItem>
            {uniqueValues.projects.map((project) => (
              <SelectItem key={project} value={project}>
                {project}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Job Title - Matches fifth column */}
        <Select
          value={filters.jobTitle}
          onValueChange={(value) => onFilterChange("jobTitle", value)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Job Title" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Job Titles">All Job Titles</SelectItem>
            {uniqueValues.jobTitles.map((title) => (
              <SelectItem key={title} value={title}>
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Payment Type - Matches sixth column */}
        <Select
          value={filters.paymentType}
          onValueChange={(value) => onFilterChange("paymentType", value)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Payment Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Payment Types</SelectItem>
            <SelectItem value="Monthly">Monthly</SelectItem>
            <SelectItem value="Daily">Daily</SelectItem>
          </SelectContent>
        </Select>

        {/* Sponsorship - Matches eighth column */}
        <Select
          value={filters.sponsorship}
          onValueChange={(value) => onFilterChange("sponsorship", value)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Sponsorship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Sponsors">All Sponsors</SelectItem>
            {uniqueValues.sponsorships.map((sponsor) => (
              <SelectItem key={sponsor} value={sponsor}>
                {sponsor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status - Matches ninth column */}
        <Select
          value={filters.status}
          onValueChange={(value) => onFilterChange("status", value)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={onClearFilters}
            className="flex items-center justify-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
