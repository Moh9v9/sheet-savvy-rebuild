
import { format, isValid, parseISO } from "date-fns";

// Format date to MMM d, yyyy (e.g., Jan 1, 2024)
export const safeFormatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "MMM d, yyyy") : "Invalid date";
  } catch (error) {
    return "Invalid date";
  }
};

// Format date as YYYY-MM-DD (e.g., 2024-01-01)
export const formatDateToISO = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "yyyy-MM-dd") : "Invalid date";
  } catch (error) {
    return "Invalid date";
  }
};

// Format date and time (e.g., Jan 1, 2024 2:30 PM)
export const formatDateTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "MMM d, yyyy h:mm a") : "Invalid date";
  } catch (error) {
    return "Invalid date";
  }
};

// Format time only (e.g., 2:30 PM)
export const formatTime = (timeString: string): string => {
  try {
    // Assuming timeString is in 24-hour format (HH:mm)
    const date = parseISO(`2000-01-01T${timeString}`);
    return isValid(date) ? format(date, "h:mm a") : "Invalid time";
  } catch (error) {
    return "Invalid time";
  }
};

