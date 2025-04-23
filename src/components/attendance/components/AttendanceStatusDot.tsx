
import React from "react";
import { CircleDot } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface AttendanceStatusDotProps {
  status: string;
  onChange?: (newStatus: string) => void;
  showToggle?: boolean;
  readOnly?: boolean;
}

export const AttendanceStatusDot: React.FC<AttendanceStatusDotProps> = ({ 
  status, 
  onChange,
  showToggle = false,
  readOnly = false
}) => {
  const isPresent = status.toLowerCase() === 'present';
  
  const handleToggle = () => {
    if (!readOnly && onChange) {
      onChange(isPresent ? 'absent' : 'present');
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <CircleDot className={`h-3 w-3 ${isPresent ? 'text-green-500' : 'text-red-500'}`} />
      {showToggle && (
        <Switch 
          checked={isPresent} 
          onCheckedChange={handleToggle}
          disabled={readOnly}
          className="scale-75"
        />
      )}
    </div>
  );
};
