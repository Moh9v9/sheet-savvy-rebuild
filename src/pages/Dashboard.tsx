
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useAttendanceData } from "@/hooks/useAttendanceData";
import { useAttendance } from "@/hooks/useAttendance";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import CardInformation from "@/components/dashboard/CardInformation";
import DailyAttendance from "@/components/dashboard/DailyAttendance";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const { user, initializing } = useAuth();
  const navigate = useNavigate();
  const currentDate = format(new Date(), "MMMM dd, yyyy");
  
  // Authentication check
  useEffect(() => {
    if (!initializing && !user) {
      navigate('/login');
    }
  }, [user, initializing, navigate]);

  // Use our existing hooks to fetch data
  const { attendanceRecords, employees, stats } = useAttendanceData();
  const { attendanceRecords: todaysAttendance, stats: todayStats } = useAttendance();

  if (initializing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  // Calculate attendance percentage for progress bar
  const attendancePercentage = stats.total > 0 
    ? Math.round((stats.present / stats.total) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Page Header - styled like the original */}
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.email?.split('@')[0] || 'User'}
            </p>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            {currentDate}
          </p>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardInformation 
          title="Total Employees"
          value={employees.length.toString()}
          icon="users"
          colorClass="border-l-blue-500"
        />
        <CardInformation 
          title="Present Today"
          value={stats.present.toString()}
          icon="check-circle"
          colorClass="border-l-green-500"
        />
        <CardInformation 
          title="Absent Today"
          value={stats.absent.toString()}
          icon="x-circle"
          colorClass="border-l-red-500"
        />
        <CardInformation 
          title="Late Today"
          value={stats.late.toString()}
          icon="clock"
          colorClass="border-l-orange-500"
        />
      </div>

      <Separator />
      
      {/* Daily Attendance Section */}
      <DailyAttendance 
        attendanceRecords={todaysAttendance}
        employees={employees}
        stats={todayStats}
      />
    </div>
  );
};

export default Dashboard;
