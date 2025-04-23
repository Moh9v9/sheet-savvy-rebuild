
import React from "react";
import { CircleDot } from "lucide-react";

interface AttendanceStatusDotProps {
  status: string | null | undefined;
}

export const AttendanceStatusDot: React.FC<AttendanceStatusDotProps> = ({ status }) => {
  const getStatusColor = (status: string | null | undefined) => {
    // Check if status is a string before using it
    const statusString = typeof status === 'string' ? status.toLowerCase() : '';
    
    switch (statusString) {
      case 'present':
      case 'حاضر':
        return 'text-green-500';
      case 'absent':
      case 'غائب':
        return 'text-red-500';
      case 'late':
      case 'متأخر':
        return 'text-orange-500';
      case 'leave':
      case 'إجازة':
        return 'text-blue-500';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-400'; // Default to gray for unknown statuses
    }
  };

  return <CircleDot className={`h-3 w-3 ${getStatusColor(status)}`} />;
};
