
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';

// Mock data - in a real app, this would come from an API
const mockData = [
  { day: 'Mon', present: 65, absent: 12, late: 8 },
  { day: 'Tue', present: 59, absent: 15, late: 10 },
  { day: 'Wed', present: 80, absent: 5, late: 3 },
  { day: 'Thu', present: 81, absent: 4, late: 5 },
  { day: 'Fri', present: 56, absent: 20, late: 12 },
  { day: 'Sat', present: 55, absent: 21, late: 9 },
  { day: 'Sun', present: 40, absent: 25, late: 10 },
];

const AttendanceChart = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setChartData(mockData);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <Skeleton className="h-72 w-full" />;
  }
  
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorLate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="day" 
            tick={{ fill: 'var(--text-color, #4B5563)' }}
            axisLine={{ stroke: 'var(--border-color, #6B7280)' }} 
          />
          <YAxis 
            tick={{ fill: 'var(--text-color, #4B5563)' }}
            axisLine={{ stroke: 'var(--border-color, #6B7280)' }}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--grid-color, #374151)" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--tooltip-bg, #1F2937)', 
              borderColor: 'var(--tooltip-border, #374151)',
              color: 'var(--tooltip-text, #F9FAFB)' 
            }} 
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="present"
            stroke="#10B981"
            fillOpacity={1}
            fill="url(#colorPresent)"
            name="Present"
          />
          <Area
            type="monotone"
            dataKey="absent"
            stroke="#EF4444"
            fillOpacity={1}
            fill="url(#colorAbsent)"
            name="Absent"
          />
          <Area
            type="monotone"
            dataKey="late"
            stroke="#F59E0B"
            fillOpacity={1}
            fill="url(#colorLate)"
            name="Late"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
