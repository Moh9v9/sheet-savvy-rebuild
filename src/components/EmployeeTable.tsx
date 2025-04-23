
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { readEmployees } from "@/services/googleSheets";
import { Employee } from "@/types/employee";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmployeeDetailsDrawer } from "./EmployeeDetailsDrawer";
import { EmployeeSearchFilter } from "./employee/EmployeeSearchFilter";
import { EmployeeTableHeader } from "./employee/EmployeeTableHeader";
import { EmployeeTableBody } from "./employee/EmployeeTableBody";

export default function EmployeeTable() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: readEmployees,
  });

  // State management
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    project: "All Projects",
    paymentType: "All",
    jobTitle: "All Job Titles",
    sponsorship: "All Sponsors"
  });

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "All",
      project: "All Projects",
      paymentType: "All",
      jobTitle: "All Job Titles",
      sponsorship: "All Sponsors"
    });
  };

  // Filter & search logic
  const filteredEmployees = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    
    let rows = data;
    
    // Apply filters
    if (filters.status !== "All") {
      rows = rows.filter((e) => e.status === filters.status);
    }
    
    if (filters.project !== "All Projects") {
      rows = rows.filter((e) => e.project === filters.project);
    }
    
    if (filters.paymentType !== "All") {
      rows = rows.filter((e) => e.paymentType === filters.paymentType);
    }
    
    if (filters.jobTitle !== "All Job Titles") {
      rows = rows.filter((e) => e.jobTitle === filters.jobTitle);
    }
    
    if (filters.sponsorship !== "All Sponsors") {
      rows = rows.filter((e) => e.sponsorship === filters.sponsorship);
    }
    
    // Apply search
    if (filters.search.trim()) {
      const term = filters.search.toLowerCase();
      rows = rows.filter(
        (e) =>
          e.fullName?.toLowerCase().includes(term) ||
          e.iqamaNo?.toString().toLowerCase().includes(term)
      );
    }
    
    return rows;
  }, [data, filters]);

  return (
    <div className="w-full mx-auto max-w-7xl bg-card/80 rounded-xl p-6 shadow-lg glass-morphism transition">
      <EmployeeSearchFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        data={data}
      />

      {isLoading ? (
        <Skeleton className="h-72 w-full" />
      ) : error ? (
        <div className="p-8 text-center text-destructive">
          Failed to load employees. Please try again.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-background">
          <Table>
            <EmployeeTableHeader />
            {filteredEmployees.length > 0 ? (
              <EmployeeTableBody 
                employees={filteredEmployees}
                onViewDetails={setSelectedEmployee}
              />
            ) : (
              <tbody>
                <tr>
                  <td colSpan={10} className="py-10 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="text-lg font-medium">No matching employees found</p>
                      <p className="text-sm">Try adjusting your filters or search criteria</p>
                      {(filters.search || filters.status !== "All" || 
                        filters.project !== "All Projects" || filters.paymentType !== "All" || 
                        filters.jobTitle !== "All Job Titles" || filters.sponsorship !== "All Sponsors") && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleClearFilters}
                          className="mt-2"
                        >
                          Clear All Filters
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
        </div>
      )}

      <EmployeeDetailsDrawer
        employee={selectedEmployee}
        open={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        onEmployeeDeleted={() => {
          refetch();
          setSelectedEmployee(null);
        }}
      />
    </div>
  );
}
