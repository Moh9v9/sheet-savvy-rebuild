
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
        return 'text-green-500';
      case 'absent':
        return 'text-red-500';
      case 'late':
        return 'text-orange-500';
      case 'leave':
        return 'text-blue-500';
      default:
        return 'text-gray-400'; // Default to gray for unknown statuses
    }
  };

  return <CircleDot className={`h-3 w-3 ${getStatusColor(status)}`} />;
};
