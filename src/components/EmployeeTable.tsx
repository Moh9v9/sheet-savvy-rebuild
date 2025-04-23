
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { readEmployees } from "@/services/googleSheets";
import { Employee } from "@/types/employee";
import { Table } from "@/components/ui/table";
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
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("All");

  // Filter & search logic
  const filteredEmployees = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    
    let rows = data;
    if (status !== "All") {
      rows = rows.filter((e) => e.status === status);
    }
    if (search.trim()) {
      const term = search.toLowerCase();
      rows = rows.filter(
        (e) =>
          e.fullName?.toLowerCase().includes(term) ||
          e.iqamaNo?.toString().toLowerCase().includes(term)
      );
    }
    return rows;
  }, [data, search, status]);

  return (
    <div className="w-full mx-auto max-w-7xl bg-card/80 rounded-xl p-6 shadow-lg glass-morphism transition">
      <EmployeeSearchFilter
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
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
            <EmployeeTableBody 
              employees={filteredEmployees}
              onViewDetails={setSelectedEmployee}
            />
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
