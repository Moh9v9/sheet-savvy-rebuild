
import React from "react";

interface AttendanceStatusBadgeProps {
  status: string | null | undefined;
}

export const AttendanceStatusBadge: React.FC<AttendanceStatusBadgeProps> = ({ status }) => {
  const getStatusBadgeColor = (status: string | null | undefined) => {
    // Check if status is a string before calling toLowerCase
    const statusString = typeof status === 'string' ? status.toLowerCase() : 'unknown';
    
    switch (statusString) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-orange-100 text-orange-800';
      case 'leave':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get a safe display value for the status
  const displayStatus = typeof status === 'string' ? 
    status.charAt(0).toUpperCase() + status.slice(1) : 
    'Unknown';

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(status)}`}>
      {displayStatus}
    </span>
  );
};
