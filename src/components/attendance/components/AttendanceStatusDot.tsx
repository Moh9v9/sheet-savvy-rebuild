
import React from "react";
import { CircleDot } from "lucide-react";

interface AttendanceStatusDotProps {
  status: string;
}

export const AttendanceStatusDot: React.FC<AttendanceStatusDotProps> = ({ status }) => {
  const isPresent = status.toLowerCase() === 'present';
  
  return (
    <CircleDot 
      className={`h-3 w-3 ${isPresent ? 'text-green-500' : 'text-red-500'}`} 
    />
  );
};
