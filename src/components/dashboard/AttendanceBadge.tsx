
import React from "react";
import { Badge } from "@/components/ui/badge";

interface AttendanceBadgeProps {
  status: string | undefined | null;
}

export const AttendanceBadge: React.FC<AttendanceBadgeProps> = ({ status }) => {
  // Handle undefined or null status values
  const statusStr = typeof status === 'string' ? status : '';
  const statusLower = statusStr.toLowerCase();
  
  const getStatusColor = () => {
    switch (statusLower) {
      case 'present':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20';
      case 'absent':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20';
      case 'late':
        return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20';
      case 'leave':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20';
    }
  };
  
  return (
    <Badge className={`${getStatusColor()} cursor-default`} variant="outline">
      {statusStr || 'Unknown'}
    </Badge>
  );
}
