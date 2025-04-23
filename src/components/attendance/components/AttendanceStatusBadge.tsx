
import React from "react";
import { getStatusColor, getDisplayStatus } from "@/utils/attendanceStatus";
import { AttendanceStatus } from "@/types/attendance";

interface AttendanceStatusBadgeProps {
  status: AttendanceStatus | string | null | undefined;
}

export const AttendanceStatusBadge: React.FC<AttendanceStatusBadgeProps> = ({ status }) => {
  const { bg: colorClass } = getStatusColor(status);
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {getDisplayStatus(status)}
    </span>
  );
};
