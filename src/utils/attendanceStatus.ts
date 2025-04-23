
import { AttendanceStatus } from "@/types/attendance";

export const getStatusColor = (status: AttendanceStatus | string | null | undefined) => {
  const statusString = typeof status === 'string' ? status.toLowerCase().trim() : '';
  
  switch (statusString) {
    case 'present':
    case 'حاضر':
      return {
        text: 'text-green-500',
        bg: 'bg-green-100 text-green-800'
      };
    case 'absent':
    case 'غائب':
      return {
        text: 'text-red-500',
        bg: 'bg-red-100 text-red-800'
      };
    case 'late':
    case 'متأخر':
      return {
        text: 'text-orange-500',
        bg: 'bg-orange-100 text-orange-800'
      };
    case 'leave':
    case 'إجازة':
      return {
        text: 'text-blue-500',
        bg: 'bg-blue-100 text-blue-800'
      };
    case 'pending':
      return {
        text: 'text-yellow-500',
        bg: 'bg-yellow-100 text-yellow-800'
      };
    default:
      return {
        text: 'text-gray-400',
        bg: 'bg-gray-100 text-gray-800'
      };
  }
};

export const getDisplayStatus = (status: AttendanceStatus | string | null | undefined): string => {
  if (typeof status !== 'string') return 'Unknown';
  
  const statusLower = status.toLowerCase().trim();
  switch (statusLower) {
    case 'present':
    case 'حاضر':
      return 'Present';
    case 'absent':
    case 'غائب':
      return 'Absent';
    case 'late':
    case 'متأخر':
      return 'Late';
    case 'leave':
    case 'إجازة':
      return 'Leave';
    case 'pending':
      return 'Pending';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};
