
/**
 * Attendance Service
 * Handles attendance-related API calls and data processing
 */

import { Employee } from "@/types/employee";

export interface AttendanceRecord {
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: "present" | "absent" | "late" | "pending";
}

export interface AttendanceStats {
  present: number;
  absent: number;
  late: number;
  pending: number;
  total: number;
}

// Mock data - would be replaced with actual API calls
const mockAttendanceRecords: AttendanceRecord[] = [
  {
    employeeId: "001",
    date: new Date().toISOString().split('T')[0],
    checkIn: "08:30",
    status: "present"
  },
  {
    employeeId: "002",
    date: new Date().toISOString().split('T')[0],
    checkIn: "09:15",
    status: "late"
  },
  {
    employeeId: "003",
    date: new Date().toISOString().split('T')[0],
    status: "absent"
  }
];

export const AttendanceService = {
  // Get today's attendance records
  async getTodaysAttendance(): Promise<AttendanceRecord[]> {
    // This would be an API call in a real implementation
    return Promise.resolve(mockAttendanceRecords);
  },

  // Get attendance for a specific employee
  async getEmployeeAttendance(employeeId: string): Promise<AttendanceRecord[]> {
    // This would be an API call in a real implementation
    return Promise.resolve(
      mockAttendanceRecords.filter(record => record.employeeId === employeeId)
    );
  },
  
  // Record check-in
  async checkIn(employeeId: string): Promise<AttendanceRecord> {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    // Determine if late (after 9:00 AM)
    const isLate = now.getHours() >= 9;
    
    const record: AttendanceRecord = {
      employeeId,
      date: now.toISOString().split('T')[0],
      checkIn: time,
      status: isLate ? "late" : "present"
    };
    
    // This would be an API call in a real implementation
    return Promise.resolve(record);
  },
  
  // Record check-out
  async checkOut(employeeId: string): Promise<AttendanceRecord> {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    // Find existing record (would be from API in real impl)
    const record = mockAttendanceRecords.find(r => r.employeeId === employeeId);
    
    if (!record) {
      throw new Error("No check-in record found");
    }
    
    const updatedRecord = {
      ...record,
      checkOut: time
    };
    
    // This would be an API call in a real implementation
    return Promise.resolve(updatedRecord);
  },
  
  // Mark as absent
  async markAbsent(employeeId: string): Promise<AttendanceRecord> {
    const record: AttendanceRecord = {
      employeeId,
      date: new Date().toISOString().split('T')[0],
      status: "absent"
    };
    
    // This would be an API call in a real implementation
    return Promise.resolve(record);
  },
  
  // Get attendance statistics for today
  async getTodayStats(): Promise<AttendanceStats> {
    // This would be an API call in a real implementation
    const records = await this.getTodaysAttendance();
    
    const stats: AttendanceStats = {
      present: records.filter(r => r.status === "present").length,
      absent: records.filter(r => r.status === "absent").length,
      late: records.filter(r => r.status === "late").length,
      pending: records.filter(r => r.status === "pending").length,
      total: records.length
    };
    
    return stats;
  }
};
