
export type AttendanceStatus = 
  | 'present' | 'حاضر'
  | 'absent' | 'غائب'
  | 'late' | 'متأخر'
  | 'leave' | 'إجازة'
  | 'pending';

export type Attendance = {
  id: string;
  employee_id: string;
  fullName: string;
  date: string;
  start_time?: string;
  end_time?: string;
  status: AttendanceStatus;
  overtime?: string;
  note?: string;
  created_at: string;
  updated_at: string;
};
