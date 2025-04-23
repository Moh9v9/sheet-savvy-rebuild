
import React from "react";
import { CircleDot } from "lucide-react";

interface AttendanceStatusDotProps {
  status: string;
}

export const AttendanceStatusDot: React.FC<AttendanceStatusDotProps> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'text-green-500';
      case 'absent':
        return 'text-red-500';
      case 'late':
        return 'text-orange-500';
      default:
        return 'text-blue-500';
    }
  };

  return <CircleDot className={`h-3 w-3 ${getStatusColor(status)}`} />;
};
