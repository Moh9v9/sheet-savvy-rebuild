import React, { useState } from "react";
import { format, isValid, parseISO } from "date-fns";
import { Attendance } from "@/services/googleSheets";
import { Employee } from "@/types/employee";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import AttendanceDetailDrawer from "./AttendanceDetailDrawer";
import EditAttendanceModal from "./EditAttendanceModal";
import DeleteAttendanceDialog from "./DeleteAttendanceDialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { AttendanceStatusDot } from "./components/AttendanceStatusDot";
import { AttendanceStatusBadge } from "./components/AttendanceStatusBadge";

interface AttendanceTableProps {
  attendanceRecords: Attendance[];
  employees: Employee[];
  onEdit: (id: string, data: Partial<Attendance>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  attendanceRecords,
  employees,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Helper function to safely format dates
  const safeFormatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, "MMM d, yyyy") : "Invalid date";
    } catch (error) {
      return "Invalid date";
    }
  };
  
  // Filter attendance records based on search query and filters
  const filteredAttendance = attendanceRecords.filter((record) => {
    // Filter by name search
    const nameMatches = record.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const statusMatches = statusFilter === "all" || record.status === statusFilter;
    
    // Filter by date
    const dateMatches = !dateFilter || record.date === format(dateFilter, "yyyy-MM-dd");
    
    return nameMatches && statusMatches && dateMatches;
  });

  const handleRowClick = (attendance: Attendance) => {
    setSelectedAttendance(attendance);
    setDetailsOpen(true);
  };

  const handleEdit = (attendance: Attendance, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedAttendance(attendance);
    setEditModalOpen(true);
  };

  const handleDelete = (attendance: Attendance, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedAttendance(attendance);
    setDeleteDialogOpen(true);
  };

  const handleStatusChange = async (record: Attendance, newStatus: string) => {
    await onEdit(record.id, { status: newStatus });
  };
  
  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Search and filter controls */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex flex-col sm:flex-row gap-2 flex-1">
            <Input
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sm:max-w-xs"
            />
            
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="sm:max-w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="leave">Leave</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="justify-start sm:max-w-[180px]"
                >
                  {dateFilter ? (
                    format(dateFilter, "PPP")
                  ) : (
                    <span>Filter by date</span>
                  )}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs" 
                    onClick={() => setDateFilter(undefined)}
                  >
                    Clear
                  </Button>
                </div>
                <Calendar
                  mode="single"
                  selected={dateFilter}
                  onSelect={setDateFilter}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Attendance table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Overtime</TableHead>
                <TableHead>Note</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    Loading attendance data...
                  </TableCell>
                </TableRow>
              ) : filteredAttendance.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No attendance records found
                  </TableCell>
                </TableRow>
              ) : (
                filteredAttendance.map((record) => (
                  <TableRow 
                    key={record.id} 
                    onClick={() => handleRowClick(record)}
                    className="cursor-pointer"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <AttendanceStatusDot 
                          status={record.status} 
                          onChange={(newStatus) => handleStatusChange(record, newStatus)}
                          showToggle
                        />
                        {record.fullName}
                      </div>
                    </TableCell>
                    <TableCell>{safeFormatDate(record.date)}</TableCell>
                    <TableCell>
                      <AttendanceStatusBadge 
                        status={record.status}
                        onChange={(newStatus) => handleStatusChange(record, newStatus)}
                      />
                    </TableCell>
                    <TableCell>{record.start_time || "N/A"}</TableCell>
                    <TableCell>{record.end_time || "N/A"}</TableCell>
                    <TableCell>{record.overtime || "N/A"}</TableCell>
                    <TableCell className="truncate max-w-[150px]">{record.note || "N/A"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleEdit(record, e)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          onClick={(e) => handleDelete(record, e)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Detail drawer */}
      <AttendanceDetailDrawer
        attendance={selectedAttendance}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
      
      {/* Edit modal */}
      <EditAttendanceModal
        attendance={selectedAttendance}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        employees={employees}
        onSuccess={handleEditSuccess}
      />
      
      {/* Delete dialog */}
      <DeleteAttendanceDialog
        attendance={selectedAttendance}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDelete={onDelete}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
};

export default AttendanceTable;
