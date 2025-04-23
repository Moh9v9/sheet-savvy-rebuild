
import { useState } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAttendanceData } from "@/hooks/useAttendanceData";
import { 
  CalendarIcon, Filter, Search, Plus, Download,
  ArrowUp, ArrowDown, Users, UserCheck, UserX, Percent
} from "lucide-react";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import AddAttendanceModal from "@/components/attendance/AddAttendanceModal";
import ExportAttendanceButton from "@/components/attendance/ExportAttendanceButton";
import { Attendance } from "@/services/googleSheets";
import { useAttendanceFilters } from "@/hooks/useAttendanceFilters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  AttendanceOverview,
  DepartmentBreakdown, 
  AttendanceChart
} from "@/components/dashboard";

const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    filterAttendance
  } = useAttendanceFilters();
  
  const {
    attendanceRecords,
    employees,
    stats,
    loading,
    addAttendanceRecord,
    editAttendanceRecord,
    deleteAttendanceRecord
  } = useAttendanceData();

  // Filter attendance records
  const filteredAttendance = filterAttendance(attendanceRecords);

  const handleAddSuccess = () => {
    setModalOpen(false);
  };

  // Create wrapper functions that convert Promise<boolean> to Promise<void>
  const handleEditAttendance = async (id: string, data: Partial<Attendance>) => {
    await editAttendanceRecord(id, data);
  };

  const handleDeleteAttendance = async (id: string) => {
    await deleteAttendanceRecord(id);
  };

  // Mock user data - in a real app, this would come from authentication context
  const currentUser = {
    fullName: "John Smith"
  };

  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM d, yyyy");

  return (
    <div className="space-y-6 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">Dashboard</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            {formattedDate}
          </p>
          <p className="text-lg mt-2 dark:text-gray-300">
            Welcome back, <span className="font-medium">{currentUser.fullName}</span>
          </p>
        </div>
      </div>

      {/* Attendance Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {loading ? (
          // Skeleton loading for stats
          <>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-4 dark:bg-gray-800">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-8 w-12" />
                </div>
              </Card>
            ))}
          </>
        ) : (
          <>
            <Card className="p-4 dark:bg-gray-800 border-l-4 border-l-blue-500 transition-transform hover:scale-[1.02] hover:shadow-lg">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground dark:text-gray-400">Total Employees</span>
                  <span className="text-2xl font-bold dark:text-white">{employees.length}</span>
                </div>
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-full">
                  <Users size={20} />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm text-green-500">
                <ArrowUp className="mr-1" size={16} />
                <span>5% from last month</span>
              </div>
            </Card>

            <Card className="p-4 dark:bg-gray-800 border-l-4 border-l-green-500 transition-transform hover:scale-[1.02] hover:shadow-lg">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground dark:text-gray-400">Present Today</span>
                  <span className="text-2xl font-bold text-green-500">{stats.present}</span>
                </div>
                <div className="p-2 bg-green-500/10 text-green-500 rounded-full">
                  <UserCheck size={20} />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <div className="flex items-center gap-1 text-gray-400 dark:text-gray-300">
                  <Percent size={14} />
                  <span>{employees.length ? Math.round((stats.present / employees.length) * 100) : 0}% of total</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 dark:bg-gray-800 border-l-4 border-l-red-500 transition-transform hover:scale-[1.02] hover:shadow-lg">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground dark:text-gray-400">Absent Today</span>
                  <span className="text-2xl font-bold text-red-500">{stats.absent}</span>
                </div>
                <div className="p-2 bg-red-500/10 text-red-500 rounded-full">
                  <UserX size={20} />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm text-red-500">
                <ArrowUp className="mr-1" size={16} />
                <span>2% from yesterday</span>
              </div>
            </Card>

            <Card className="p-4 dark:bg-gray-800 border-l-4 border-l-orange-500 transition-transform hover:scale-[1.02] hover:shadow-lg">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground dark:text-gray-400">Late Today</span>
                  <span className="text-2xl font-bold text-orange-500">{stats.late}</span>
                </div>
                <div className="p-2 bg-orange-500/10 text-orange-500 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm text-orange-500">
                <ArrowDown className="mr-1" size={16} />
                <span>3% from yesterday</span>
              </div>
            </Card>
          </>
        )}
      </div>

      {/* Data Visualization Section */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="dark:bg-gray-800 col-span-full xl:col-span-2 overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-medium dark:text-white">Weekly Attendance Overview</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Attendance trends for the past 7 days</p>
          </div>
          <div className="px-6 pb-6">
            <AttendanceChart />
          </div>
        </Card>

        <Card className="dark:bg-gray-800 overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-medium dark:text-white">Department Breakdown</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Employee distribution by department</p>
          </div>
          <div className="px-6 pb-6 flex justify-center">
            <DepartmentBreakdown />
          </div>
        </Card>

        <Card className="dark:bg-gray-800 col-span-full">
          <div className="p-6">
            <h3 className="text-lg font-medium dark:text-white">Monthly Attendance Overview</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Attendance patterns for the current month</p>
          </div>
          <div className="px-6 pb-6">
            <AttendanceOverview />
          </div>
        </Card>
      </div>

      {/* Attendance Table Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold dark:text-white">Today's Attendance Records</h2>
          <div className="flex gap-2">
            <ExportAttendanceButton
              attendanceRecords={filteredAttendance}
              filters={{ searchQuery, statusFilter, dateFilter }}
            />
            <Button onClick={() => setModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Attendance
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex flex-col sm:flex-row gap-2 flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name or iqama number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 sm:max-w-xs dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="leave">Leave</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  {dateFilter ? format(dateFilter, "PPP") : 
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span>Pick a date</span>
                    </div>
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:border-gray-700" align="start">
                <div className="p-2 flex justify-between items-center border-b dark:border-gray-700">
                  <span className="font-medium dark:text-white">Filter by date</span>
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
                  className="dark:bg-gray-800 dark:text-white border-0"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="rounded-md dark:bg-gray-800 border dark:border-gray-700">
          <AttendanceTable
            attendanceRecords={filteredAttendance}
            employees={employees}
            onEdit={handleEditAttendance}
            onDelete={handleDeleteAttendance}
            isLoading={loading}
          />
        </div>
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
