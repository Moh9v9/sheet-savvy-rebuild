import { useState, useMemo } from "react";
import { Attendance } from "@/services/googleSheets";
import { format, isValid, parseISO } from "date-fns";

export const useAttendanceTable = (attendanceRecords: Attendance[], defaultDateFilter?: Date) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(defaultDateFilter);
  const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Filter attendance records based on search query and filters
  const filteredAttendance = useMemo(() => {
    let records = attendanceRecords;
    
    // Filter by name search
    if (searchQuery.trim()) {
      records = records.filter((record) =>
        record.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by status
    if (statusFilter !== "all") {
      records = records.filter((record) => record.status === statusFilter);
    }
    
    // Filter by date - now using the default date filter if provided
    if (dateFilter) {
      const filterDateStr = format(dateFilter, "yyyy-MM-dd");
      records = records.filter((record) => record.date === filterDateStr);
    }
    
    return records;
  }, [attendanceRecords, searchQuery, statusFilter, dateFilter]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    selectedAttendance,
    setSelectedAttendance,
    detailsOpen,
    setDetailsOpen,
    editModalOpen,
    setEditModalOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    filteredAttendance
  };
};
