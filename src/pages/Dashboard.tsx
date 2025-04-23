
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAttendanceData } from "@/hooks/useAttendanceData";
import { Plus, Download, Filter } from "lucide-react";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import AddAttendanceModal from "@/components/attendance/AddAttendanceModal";
import ExportAttendanceButton from "@/components/attendance/ExportAttendanceButton";
import { Attendance } from "@/services/googleSheets";
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
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { AttendanceFilters } from "@/components/attendance/components/AttendanceFilters";

const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  
  const {
    attendanceRecords,
    employees,
    stats,
    loading,
    addAttendanceRecord,
    editAttendanceRecord,
    deleteAttendanceRecord
  } = useAttendanceData();

  const handleAddSuccess = () => {
    setModalOpen(false);
  };

  // Create wrapper functions that convert Promise<boolean> to Promise<void>
  const handleEditAttendance = async (id: string, data: Partial<Attendance>) => {
    await editAttendanceRecord(id, data);
    // Return type is void
  };

  const handleDeleteAttendance = async (id: string) => {
    await deleteAttendanceRecord(id);
    // Return type is void
  };

  // Calculate attendance percentage
  const attendancePercentage = stats.total > 0 
    ? Math.round((stats.present / stats.total) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of attendance and employee statistics
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <ExportAttendanceButton
            attendanceRecords={attendanceRecords}
            filters={{ searchQuery, statusFilter, dateFilter }}
          />
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Attendance
          </Button>
        </div>
      </div>

      {/* Attendance Progress Bar */}
      <Card className="p-4 bg-white shadow-sm">
        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium">Today's Attendance</h3>
            <span className="text-sm font-medium">{attendancePercentage}%</span>
          </div>
          <Progress value={attendancePercentage} className="h-2" />
        </div>
      </Card>

      {/* Attendance Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground">Total Records</span>
              <span className="text-2xl font-bold">{stats.total}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground">Present</span>
              <span className="text-2xl font-bold text-green-600">{stats.present}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground">Absent</span>
              <span className="text-2xl font-bold text-red-600">{stats.absent}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground">Late</span>
              <span className="text-2xl font-bold text-orange-600">{stats.late}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Attendance Table Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Attendance Records</h2>
        </div>

        {/* Filters Section */}
        <AttendanceFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />

        <AttendanceTable
          attendanceRecords={attendanceRecords}
          employees={employees}
          onEdit={handleEditAttendance}
          onDelete={handleDeleteAttendance}
          isLoading={loading}
        />
      </div>

      <AddAttendanceModal
        open={isModalOpen}
        onOpenChange={setModalOpen}
        employees={employees}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
};

export default Dashboard;
