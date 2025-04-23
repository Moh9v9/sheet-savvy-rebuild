import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { readEmployees } from "@/services/googleSheets";
import { Employee } from "@/types/employee";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import EditEmployeeModal from "./EditEmployeeModal";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { EmployeeDetailsDrawer } from "./EmployeeDetailsDrawer";

const statusOptions = ["All", "Active", "Archived"];

export default function EmployeeTable() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: readEmployees,
  });

  // State for edit modal
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // State for delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Search & filter state
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

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    refetch();
  };

  return (
    <div className="w-full mx-auto max-w-7xl bg-card/80 rounded-xl p-6 shadow-lg glass-morphism transition">
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or Iqama No"
              aria-label="Search employees"
            />
          </div>
          <div className="ml-0 md:ml-2">
            <select
              className="h-10 px-3 rounded-md border border-muted bg-background text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Filter by status"
            >
              {statusOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="h-72 w-full" />
      ) : error ? (
        <div className="p-8 text-center text-destructive">
          Failed to load employees. Please try again.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-background">
          <Table>
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
            <TableBody>
              {!filteredEmployees || filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-muted-foreground">
                    No employees found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((emp: Employee) => (
                  <TableRow key={emp.id}>
                    <TableCell>
                      <Button
                        variant="link"
                        className="p-0 h-auto font-normal"
                        onClick={() => setSelectedEmployee(emp)}
                      >
                        {emp.fullName}
                      </Button>
                    </TableCell>
                    <TableCell>{emp.iqamaNo}</TableCell>
                    <TableCell>{emp.project}</TableCell>
                    <TableCell>{emp.location}</TableCell>
                    <TableCell>{emp.jobTitle}</TableCell>
                    <TableCell>{emp.paymentType}</TableCell>
                    <TableCell>{emp.rateOfPayment}</TableCell>
                    <TableCell>{emp.sponsorship || "-"}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "px-2 py-1 rounded text-xs font-medium",
                          emp.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {emp.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedEmployee(emp)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
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
