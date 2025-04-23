
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { 
  Attendance, 
  readAttendance, 
  addAttendance, 
  updateAttendance, 
  deleteAttendance 
} from '@/services/googleSheets';
import { Employee } from '@/types/employee';
import { readEmployees } from '@/services/googleSheets';

export interface AttendanceStats {
  present: number;
  absent: number;
  late: number;
  leave: number;
  total: number;
}

export const useAttendanceData = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [stats, setStats] = useState<AttendanceStats>({
    present: 0,
    absent: 0,
    late: 0,
    leave: 0,
    total: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // Force a refresh of data
  const refreshData = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  // Load employees and attendance data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load employees and attendance in parallel
        const [employeesData, attendanceData] = await Promise.all([
          readEmployees(),
          readAttendance()
        ]);
        
        setEmployees(employeesData);
        setAttendanceRecords(attendanceData);
        
        // Calculate attendance statistics
        const calculatedStats: AttendanceStats = {
          present: 0,
          absent: 0,
          late: 0,
          leave: 0,
          total: employeesData.length
        };
        
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        
        // Filter today's records
        const todaysRecords = attendanceData.filter(record => 
          record.date === today
        );
        
        // Count status for today
        todaysRecords.forEach(record => {
          if (record.status === 'present') calculatedStats.present++;
          else if (record.status === 'absent') calculatedStats.absent++;
          else if (record.status === 'late') calculatedStats.late++;
          else if (record.status === 'leave') calculatedStats.leave++;
        });
        
        setStats(calculatedStats);
      } catch (error) {
        console.error("Error loading attendance data:", error);
        toast.error("Failed to load attendance data");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [refreshTrigger]);

  // Add a new attendance record
  const addAttendanceRecord = async (data: Omit<Attendance, "created_at" | "updated_at">) => {
    try {
      await addAttendance(data);
      toast.success("Attendance record added successfully");
      refreshData();
      return true;
    } catch (error) {
      console.error("Error adding attendance record:", error);
      toast.error("Failed to add attendance record");
      return false;
    }
  };

  // Edit an attendance record
  const editAttendanceRecord = async (id: string, data: Partial<Attendance>) => {
    try {
      await updateAttendance(id, data);
      toast.success("Attendance record updated successfully");
      refreshData();
      return true;
    } catch (error) {
      console.error("Error updating attendance record:", error);
      toast.error("Failed to update attendance record");
      return false;
    }
  };

  // Delete an attendance record
  const deleteAttendanceRecord = async (id: string) => {
    try {
      await deleteAttendance(id);
      toast.success("Attendance record deleted successfully");
      refreshData();
      return true;
    } catch (error) {
      console.error("Error deleting attendance record:", error);
      toast.error("Failed to delete attendance record");
      return false;
    }
  };

  return {
    attendanceRecords,
    employees,
    stats,
    loading,
    refreshData,
    addAttendanceRecord,
    editAttendanceRecord,
    deleteAttendanceRecord
  };
};
