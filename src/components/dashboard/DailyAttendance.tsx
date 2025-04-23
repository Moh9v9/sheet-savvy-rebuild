
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { AttendanceStatusDot } from "@/components/attendance/components/AttendanceStatusDot";
import { Attendance } from "@/services/googleSheets";
import { Employee } from "@/types/employee";
import { safeFormatDate } from "@/utils/dateUtils";

interface DailyAttendanceProps {
  attendanceRecords: Attendance[];
  employees: Employee[];
  stats: {
    present: number;
    absent: number;
    late: number;
    total: number;
  };
}

const DailyAttendance: React.FC<DailyAttendanceProps> = ({ 
  attendanceRecords,
  employees,
  stats
}) => {
  // Calculate attendance percentage
  const attendancePercentage = stats.total > 0 
    ? Math.round((stats.present / stats.total) * 100) 
    : 0;

  // Only show records from today
  const today = format(new Date(), "yyyy-MM-dd");
  const todaysRecords = attendanceRecords.filter(
    record => record.date === today
  ).slice(0, 5); // Only show top 5 for dashboard

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Today's Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Attendance Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Present</span>
                <span className="font-medium">{stats.present} of {stats.total} ({attendancePercentage}%)</span>
              </div>
              <Progress value={attendancePercentage} className="h-2" />
            </div>
            
            {/* Recent Attendance Table */}
            <div className="rounded-md border mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todaysRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        No attendance records for today
                      </TableCell>
                    </TableRow>
                  ) : (
                    todaysRecords.map((record) => (
                      <TableRow key={record.id} className="h-12">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <AttendanceStatusDot status={record.status} />
                            <span>{record.fullName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            record.status === 'present' 
                              ? 'bg-green-100 text-green-800' 
                              : record.status === 'absent'
                              ? 'bg-red-100 text-red-800'
                              : record.status === 'late'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>{record.start_time || "N/A"}</TableCell>
                        <TableCell className="text-right">
                          {safeFormatDate(record.date)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* View All Link */}
            {todaysRecords.length > 0 && (
              <div className="text-center mt-2">
                <a 
                  href="/attendance" 
                  className="text-sm text-primary hover:underline"
                >
                  View all attendance records
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyAttendance;
