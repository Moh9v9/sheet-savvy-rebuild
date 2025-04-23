
import React from "react";

interface AttendanceStatusBadgeProps {
  status: string | null | undefined;
}

export const AttendanceStatusBadge: React.FC<AttendanceStatusBadgeProps> = ({ status }) => {
  const getStatusBadgeColor = (status: string | null | undefined) => {
    // Check if status is a string before calling toLowerCase
    const statusString = typeof status === 'string' ? status.toLowerCase().trim() : '';
    
    switch (statusString) {
      case 'present':
      case 'حاضر':
        return 'bg-green-100 text-green-800';
      case 'absent':
      case 'غائب':
        return 'bg-red-100 text-red-800';
      case 'late':
      case 'متأخر':
        return 'bg-orange-100 text-orange-800';
      case 'leave':
      case 'إجازة':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDisplayStatus = (status: string | null | undefined): string => {
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

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(status)}`}>
      {getDisplayStatus(status)}
    </span>
  );
};
