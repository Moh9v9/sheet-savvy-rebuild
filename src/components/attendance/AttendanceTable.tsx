
import React from "react";
import { Employee } from "@/types/employee";
import { AttendanceRecord } from "@/services/AttendanceService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Clock, CircleDot } from "lucide-react";

interface AttendanceTableProps {
  employees: Employee[];
  getEmployeeAttendance: (employeeId: string) => AttendanceRecord | undefined;
  onCheckIn: (employeeId: string) => void;
  onCheckOut: (employeeId: string) => void;
  onMarkAbsent: (employeeId: string) => void;
  isLoading?: boolean;
}

const AttendanceTable = ({
  employees,
  getEmployeeAttendance,
  onCheckIn,
  onCheckOut,
  onMarkAbsent,
  isLoading = false
}: AttendanceTableProps) => {
  // Current date
  const today = format(new Date(), "EEEE, MMMM do yyyy");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Today's Attendance</h2>
        <div className="text-muted-foreground text-sm">{today}</div>
      </div>

      <Table className="border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                Loading attendance data...
              </TableCell>
            </TableRow>
          ) : employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                No employees found
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee) => {
              const attendance = getEmployeeAttendance(employee.id);
              const status = attendance?.status || "pending";
              const hasCheckedIn = !!attendance?.checkIn;
              const hasCheckedOut = !!attendance?.checkOut;

              return (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.fullName}</TableCell>
                  <TableCell>{employee.project}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={status} />
                      {status}
                    </div>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    {!hasCheckedIn && status !== "absent" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
                        onClick={() => onCheckIn(employee.id)}
                      >
                        <Clock className="mr-1 h-4 w-4" />
                        Check In
                      </Button>
                    )}
                    {hasCheckedIn && !hasCheckedOut && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-orange-600 border-orange-600 hover:bg-orange-50 hover:text-orange-700"
                        onClick={() => onCheckOut(employee.id)}
                      >
                        <Clock className="mr-1 h-4 w-4" />
                        Check Out
                      </Button>
                    )}
                    {!hasCheckedIn && status !== "absent" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => onMarkAbsent(employee.id)}
                      >
                        Absent
                      </Button>
                    )}
                    {(hasCheckedIn && hasCheckedOut) || status === "absent" ? (
                      <span className="text-sm text-muted-foreground">Recorded</span>
                    ) : null}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "present":
      return <CircleDot className="h-4 w-4 text-green-500" />;
    case "late":
      return <CircleDot className="h-4 w-4 text-orange-500" />;
    case "absent":
      return <CircleDot className="h-4 w-4 text-red-500" />;
    case "pending":
    default:
      return <CircleDot className="h-4 w-4 text-gray-400" />;
  }
};

export default AttendanceTable;
