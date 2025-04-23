
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';

// Mock data - in a real app, this would come from an API
const mockData = [
  { date: '05/01', attendance: 88, target: 95 },
  { date: '05/05', attendance: 92, target: 95 },
  { date: '05/10', attendance: 85, target: 95 },
  { date: '05/15', attendance: 90, target: 95 },
  { date: '05/20', attendance: 94, target: 95 },
  { date: '05/25', attendance: 91, target: 95 },
  { date: '05/30', attendance: 93, target: 95 }
];

const AttendanceOverview = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setChartData(mockData);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <Skeleton className="h-72 w-full" />;
  }
  
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--grid-color, #374151)" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: 'var(--text-color, #4B5563)' }}
            axisLine={{ stroke: 'var(--border-color, #6B7280)' }} 
          />
          <YAxis 
            domain={[70, 100]}
            tick={{ fill: 'var(--text-color, #4B5563)' }}
            axisLine={{ stroke: 'var(--border-color, #6B7280)' }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Attendance Rate']} 
            contentStyle={{ 
              backgroundColor: 'var(--tooltip-bg, #1F2937)', 
              borderColor: 'var(--tooltip-border, #374151)',
              color: 'var(--tooltip-text, #F9FAFB)' 
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="attendance"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Attendance Rate"
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#10B981"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Target Rate"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceOverview;
