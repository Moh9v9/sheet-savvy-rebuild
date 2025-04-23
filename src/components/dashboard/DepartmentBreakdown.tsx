
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';

// Mock data - in a real app, this would come from an API
const mockData = [
  { name: 'Engineering', value: 20, color: '#3B82F6' },
  { name: 'HR', value: 8, color: '#10B981' },
  { name: 'Finance', value: 12, color: '#F59E0B' },
  { name: 'Marketing', value: 15, color: '#8B5CF6' },
  { name: 'Operations', value: 18, color: '#EC4899' }
];

const DepartmentBreakdown = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setChartData(mockData);
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Skeleton className="h-40 w-40 rounded-full" />
      </div>
    );
  }
  
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={40}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value} employees`, 'Count']}
            contentStyle={{ 
              backgroundColor: 'var(--tooltip-bg, #1F2937)', 
              borderColor: 'var(--tooltip-border, #374151)',
              color: 'var(--tooltip-text, #F9FAFB)' 
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentBreakdown;
