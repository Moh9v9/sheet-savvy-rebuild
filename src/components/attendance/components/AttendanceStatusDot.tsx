
import React from "react";
import { CircleDot } from "lucide-react";
import { getStatusColor } from "@/utils/attendanceStatus";
import { AttendanceStatus } from "@/types/attendance";

interface AttendanceStatusDotProps {
  status: AttendanceStatus | string | null | undefined;
}

export const AttendanceStatusDot: React.FC<AttendanceStatusDotProps> = ({ status }) => {
  const { text: colorClass } = getStatusColor(status);
  return <CircleDot className={`h-3 w-3 ${colorClass}`} />;
};
