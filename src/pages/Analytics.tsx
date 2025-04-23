
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon 
} from "lucide-react";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Visualize and analyze your Google Sheets data.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <BarChartIcon size={16} />
          Bar Chart
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <LineChartIcon size={16} />
          Line Chart
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <PieChartIcon size={16} />
          Pie Chart
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-medium mb-4">Create Your First Chart</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Connect your Google Sheet and select data to visualize.
          </p>
          <div className="flex justify-end">
            <Button>Get Started</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-medium mb-4">Analytics Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-2 mb-4">
            <li>• Select specific columns for more focused charts</li>
            <li>• Use filters to analyze subsets of your data</li>
            <li>• Create multiple visualizations to compare different views</li>
          </ul>
          <div className="flex justify-end">
            <Button variant="outline">Learn More</Button>
          </div>
        </Card>
      </div>

      {/* Placeholder for charts */}
      <div className="bg-gray-100 border rounded-md h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground text-center">
          Connect a Google Sheet and select a chart type<br />
          to visualize your data here.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="font-medium text-blue-800 mb-2">Pro Tip</h3>
        <p className="text-sm text-blue-700">
          For best results, ensure your Google Sheet has clear column headers and consistent data formats.
          This helps generate more accurate and meaningful visualizations.
        </p>
      </div>
    </div>
  );
};

export default Analytics;
