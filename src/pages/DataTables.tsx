
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SheetsService, SheetData } from "@/services/SheetsService";

const DataTables = () => {
  const [sheetData, setSheetData] = useState<SheetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [sheetId, setSheetId] = useState("");
  const [range, setRange] = useState("Sheet1!A1:Z100");

  const fetchData = async () => {
    if (!sheetId) {
      alert("Please enter a Sheet ID");
      return;
    }
    
    setLoading(true);
    try {
      const data = await SheetsService.getSheetData(sheetId, range);
      setSheetData(data);
    } catch (error) {
      alert(`Error fetching data: ${error instanceof Error ? error.message : String(error)}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Data Tables</h1>
        <p className="text-muted-foreground">
          View and analyze your Google Sheets data.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex flex-col space-y-2">
          <label htmlFor="sheetId" className="text-sm font-medium">
            Sheet ID
          </label>
          <Input
            id="sheetId"
            placeholder="Enter Google Sheet ID"
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="range" className="text-sm font-medium">
            Range
          </label>
          <Input
            id="range"
            placeholder="e.g. Sheet1!A1:Z100"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <Button 
            onClick={fetchData} 
            disabled={loading}
            className="w-full"
          >
            {loading ? "Loading..." : "Load Data"}
          </Button>
        </div>
      </div>

      {sheetData ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {sheetData.columns.map((column, index) => (
                  <TableHead key={index}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sheetData.rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell: any, cellIndex: number) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="rounded-md border p-8 text-center">
          <p className="text-muted-foreground">
            Enter a Sheet ID and range to load data.
          </p>
        </div>
      )}
    </div>
  );
};

export default DataTables;
