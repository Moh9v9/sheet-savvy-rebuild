
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SheetsService } from "@/services/SheetsService";
import { useAttendance } from "@/hooks/useAttendance";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import AttendanceStats from "@/components/attendance/AttendanceStats";

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [recentSheets, setRecentSheets] = useState<string[]>([]);
  
  const {
    employees,
    stats,
    loading,
    getEmployeeAttendance,
    checkIn,
    checkOut,
    markAbsent
  } = useAttendance();

  // Mock sheet connection process
  const connectSheet = () => {
    const sheetUrl = prompt("Enter your Google Sheet URL:");
    if (sheetUrl) {
      SheetsService.connectToSheet(sheetUrl)
        .then(() => {
          setIsConnected(true);
          setRecentSheets(prev => [sheetUrl, ...prev].slice(0, 3));
        })
        .catch(error => {
          alert(`Error connecting to sheet: ${error.message}`);
        });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to Sheet Savvy - your Google Sheets data visualization tool.
          </p>
        </div>
        <Button onClick={connectSheet}>
          {isConnected ? "Connect Another Sheet" : "Connect Google Sheet"}
        </Button>
      </div>

      {!isConnected ? (
        <Card className="p-6 flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold mb-2">Get Started</h2>
          <p className="text-muted-foreground mb-4">
            Connect your Google Sheets to view and analyze your data
          </p>
          <Button onClick={connectSheet}>Connect Your First Sheet</Button>
        </Card>
      ) : (
        <>
          {/* Attendance Stats */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Attendance Overview</h2>
            <AttendanceStats stats={stats} isLoading={loading} />
          </div>

          {/* Attendance Table */}
          <AttendanceTable 
            employees={employees}
            getEmployeeAttendance={getEmployeeAttendance}
            onCheckIn={checkIn}
            onCheckOut={checkOut}
            onMarkAbsent={markAbsent}
            isLoading={loading}
          />
          
          {/* Dashboard Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <h3 className="font-medium mb-2">Recent Activity</h3>
              <p className="text-sm text-muted-foreground">
                Sheet "Example Sheet" was last updated 2 hours ago
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-medium mb-2">Quick Stats</h3>
              <p className="text-sm text-muted-foreground">
                3 sheets connected • 256 rows of data • 15 columns
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-medium mb-2">Data Health</h3>
              <p className="text-sm text-muted-foreground">
                All connected sheets are syncing properly
              </p>
            </Card>
          </div>
        </>
      )}

      {recentSheets.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Sheets</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentSheets.map((sheet, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-medium mb-2 truncate">
                  {sheet.substring(sheet.lastIndexOf('/') + 1) || `Sheet ${index + 1}`}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 truncate">
                  {sheet}
                </p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    View Data
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
