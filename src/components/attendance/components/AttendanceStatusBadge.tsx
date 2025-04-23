
import React from "react";

interface AttendanceStatusBadgeProps {
  status: string;
}

export const AttendanceStatusBadge: React.FC<AttendanceStatusBadgeProps> = ({ status }) => {
  const isPresent = status.toLowerCase() === 'present';
  
  return (
    <span 
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        isPresent 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}
    >
      {isPresent ? 'Present' : 'Absent'}
    </span>
  );
};
