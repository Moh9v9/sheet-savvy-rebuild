
import { useState } from "react";
import { format } from "date-fns";

export const useAttendanceFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  const filterAttendance = (records: any[]) => {
    return records.filter((record) => {
      // Filter by name or iqama search
      const searchTerms = searchQuery.toLowerCase().trim();
      const nameMatches = record.fullName?.toLowerCase().includes(searchTerms) || false;
      const iqamaMatches = record.iqamaNumber?.toLowerCase().includes(searchTerms) || false;
      const searchMatches = nameMatches || iqamaMatches || searchTerms === "";
      
      // Filter by status
      const statusMatches = statusFilter === "all" || record.status === statusFilter;
      
      // Filter by date
      const dateMatches = !dateFilter || record.date === format(dateFilter, "yyyy-MM-dd");
      
      return searchMatches && statusMatches && dateMatches;
    });
  };

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    filterAttendance
  };
};
