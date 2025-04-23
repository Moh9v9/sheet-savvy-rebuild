
import { useState, useMemo } from "react";
import { Attendance } from "@/services/googleSheets";

export const useAttendanceTable = (attendanceRecords: Attendance[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
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
    
    return records;
  }, [attendanceRecords, searchQuery, statusFilter]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
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
