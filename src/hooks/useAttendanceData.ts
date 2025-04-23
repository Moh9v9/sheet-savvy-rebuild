import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { 
  Attendance, 
  readAttendance, 
  addAttendance, 
  updateAttendance, 
  deleteAttendance,
  readEmployees,
  Employee
} from '@/services/googleSheets';

export interface AttendanceStats {
  present: number;
  absent: number;
  late: number;
  leave: number;
  total: number;
}

export const useAttendanceData = (selectedDate: Date = new Date()) => {
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

  const refreshData = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const [employeesData, attendanceData] = await Promise.all([
          readEmployees(),
          readAttendance()
        ]);
        
        const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
        const filteredAttendance = attendanceData.filter(
          record => record.date === selectedDateStr
        );
        
        setEmployees(employeesData);
        setAttendanceRecords(filteredAttendance);
        
        const calculatedStats: AttendanceStats = {
          present: 0,
          absent: 0,
          late: 0,
          leave: 0,
          total: employeesData.length
        };
        
        filteredAttendance.forEach(record => {
          if (record.status === 'present' || record.status === 'حاضر') calculatedStats.present++;
          else if (record.status === 'absent' || record.status === 'غائب') calculatedStats.absent++;
          else if (record.status === 'late' || record.status === 'متأخر') calculatedStats.late++;
          else if (record.status === 'leave' || record.status === 'إجازة') calculatedStats.leave++;
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
  }, [refreshTrigger, selectedDate]);

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
