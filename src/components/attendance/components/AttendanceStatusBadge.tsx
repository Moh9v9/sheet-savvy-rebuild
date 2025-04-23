
import React from "react";
import { Switch } from "@/components/ui/switch";

interface AttendanceStatusBadgeProps {
  status: string;
  onChange?: (newStatus: string) => void;
  readOnly?: boolean;
}

export const AttendanceStatusBadge: React.FC<AttendanceStatusBadgeProps> = ({ 
  status, 
  onChange,
  readOnly = false
}) => {
  const isPresent = status.toLowerCase() === 'present';
  
  const handleToggle = () => {
    if (!readOnly && onChange) {
      onChange(isPresent ? 'absent' : 'present');
    }
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Switch 
        checked={isPresent} 
        onCheckedChange={handleToggle}
        disabled={readOnly}
      />
      <span 
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          isPresent 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}
      >
        {isPresent ? 'Present' : 'Absent'}
      </span>
    </div>
  );
};
