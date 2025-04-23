import { useState, useEffect, useCallback } from 'react';
import { Employee, readEmployees } from '@/services/googleSheets';
import { AttendanceRecord, AttendanceStats, AttendanceService } from '@/services/AttendanceService';
import { toast } from 'sonner';

export const useAttendance = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState<AttendanceStats>({
    present: 0,
    absent: 0,
    late: 0,
    pending: 0,
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
        const [employeesData, attendanceData, statsData] = await Promise.all([
          readEmployees(),
          AttendanceService.getTodaysAttendance(),
          AttendanceService.getTodayStats()
        ]);
        
        setEmployees(employeesData);
        setAttendanceRecords(attendanceData);
        setStats(statsData);
      } catch (error) {
        console.error("Error loading attendance data:", error);
        toast.error("Failed to load attendance data");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [refreshTrigger]);

  // Get attendance status for an employee
  const getEmployeeAttendance = useCallback((employeeId: string): AttendanceRecord | undefined => {
    return attendanceRecords.find(record => record.employeeId === employeeId);
  }, [attendanceRecords]);

  // Check in an employee
  const checkIn = useCallback(async (employeeId: string) => {
    try {
      const record = await AttendanceService.checkIn(employeeId);
      
      // Update local state
      setAttendanceRecords(prev => {
        const existing = prev.findIndex(r => r.employeeId === employeeId);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = record;
          return updated;
        }
        return [...prev, record];
      });
      
      // Update stats
      refreshData();
      
      toast.success("Check-in recorded successfully");
      return record;
    } catch (error) {
      toast.error("Failed to record check-in");
      throw error;
    }
  }, [refreshData]);

  // Check out an employee
  const checkOut = useCallback(async (employeeId: string) => {
    try {
      const record = await AttendanceService.checkOut(employeeId);
      
      // Update local state
      setAttendanceRecords(prev => {
        const existing = prev.findIndex(r => r.employeeId === employeeId);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = record;
          return updated;
        }
        return prev;
      });
      
      toast.success("Check-out recorded successfully");
      return record;
    } catch (error) {
      toast.error("Failed to record check-out");
      throw error;
    }
  }, []);

  // Mark employee as absent
  const markAbsent = useCallback(async (employeeId: string) => {
    try {
      const record = await AttendanceService.markAbsent(employeeId);
      
      // Update local state
      setAttendanceRecords(prev => {
        const existing = prev.findIndex(r => r.employeeId === employeeId);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = record;
          return updated;
        }
        return [...prev, record];
      });
      
      // Update stats
      refreshData();
      
      toast.success("Employee marked as absent");
      return record;
    } catch (error) {
      toast.error("Failed to mark employee as absent");
      throw error;
    }
  }, [refreshData]);

  return {
    employees,
    attendanceRecords,
    stats,
    loading,
    refreshData,
    getEmployeeAttendance,
    checkIn,
    checkOut,
    markAbsent
  };
};
