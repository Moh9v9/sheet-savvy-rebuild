
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AttendanceStats as AttendanceStatsType } from "@/services/AttendanceService";

interface AttendanceStatsProps {
  stats: AttendanceStatsType;
  isLoading?: boolean;
}

const AttendanceStats = ({ stats, isLoading = false }: AttendanceStatsProps) => {
  if (isLoading) {
    return (
      <Card className="p-4">
        <CardContent className="p-0">Loading statistics...</CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        label="Present"
        value={stats.present}
        total={stats.total}
        colorClass="text-green-600"
        bgClass="bg-green-100"
      />
      <StatCard
        label="Late"
        value={stats.late}
        total={stats.total}
        colorClass="text-orange-600"
        bgClass="bg-orange-100"
      />
      <StatCard
        label="Absent"
        value={stats.absent}
        total={stats.total}
        colorClass="text-red-600"
        bgClass="bg-red-100"
      />
      <StatCard
        label="Pending"
        value={stats.pending}
        total={stats.total}
        colorClass="text-gray-600"
        bgClass="bg-gray-100"
      />
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  total: number;
  colorClass: string;
  bgClass: string;
}

const StatCard = ({ label, value, total, colorClass, bgClass }: StatCardProps) => {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
  
  return (
    <Card className="stats-card">
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-medium ${colorClass}`}>{label}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${bgClass} ${colorClass}`}>
          {percentage}%
        </span>
      </div>
      <p className="stats-value">
        {value}
        <span className="text-sm text-muted-foreground ml-1">/ {total}</span>
      </p>
    </Card>
  );
};

export default AttendanceStats;
