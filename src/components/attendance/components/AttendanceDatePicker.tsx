
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface AttendanceDatePickerProps {
  dateFilter: Date | undefined;
  setDateFilter: (date: Date | undefined) => void;
}

export const AttendanceDatePicker: React.FC<AttendanceDatePickerProps> = ({
  dateFilter,
  setDateFilter,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start sm:max-w-[180px]">
          {dateFilter ? format(dateFilter, "PPP") : <span>Filter by date</span>}
          <CalendarIcon className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={() => setDateFilter(undefined)}
          >
            Clear
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={dateFilter}
          onSelect={setDateFilter}
          initialFocus
          className="pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );
};
