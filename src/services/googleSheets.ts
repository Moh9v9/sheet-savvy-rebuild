
import { Attendance as AttendanceType } from "@/types/attendance";
import { Employee as EmployeeType, EmployeeInput } from "@/types/employee";

const N8N_ATTENDANCE_WEBHOOK = "https://n8n.moh9v9.com/webhook/get-attendance";
const N8N_EMPLOYEES_WEBHOOK = "https://n8n.moh9v9.com/webhook/get-employees";
const N8N_AUTH_WEBHOOK = "https://n8n.moh9v9.com/webhook/auth";

// Export the types for external use
export type Attendance = AttendanceType;
export type Employee = EmployeeType;

// Type definitions for authentication
export type GoogleSheetsUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  name?: string; // Optional name property
};

// ATTENDANCE METHODS

// Read attendance records with optional date filter
export async function readAttendance(date?: string): Promise<Attendance[]> {
  const res = await fetch(N8N_ATTENDANCE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      operation: "read",
      // If date is provided, include it in the request for server-side filtering
      ...(date && { date }) 
    }),
  });
  
  const data = await res.json();
  
  // Map boolean status to string status
  const processedData = Array.isArray(data) ? data.map(item => ({
    ...item,
    status: processAttendanceStatus(item.status)
  })) : [];
  
  console.log('Processed Attendance Data:', processedData);
  
  return processedData;
}

// Helper function to process status values
function processAttendanceStatus(status: any): AttendanceType['status'] {
  if (status === true) return 'present';
  if (status === false) return 'absent';
  return status as AttendanceType['status'];
}

// Add a new attendance record
export async function addAttendance(data: Omit<Attendance, "created_at" | "updated_at">): Promise<Attendance> {
  // Check if an attendance record already exists for this employee and date
  const now = new Date().toISOString();
  const attendanceData = {
    ...data,
    created_at: now,
    updated_at: now
  };
  
  const res = await fetch(N8N_ATTENDANCE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      operation: "create", 
      data: attendanceData,
      // Include explicit lookupKeys for the server to prevent duplicates
      lookupKeys: {
        date: data.date,
        employee_id: data.employee_id
      }
    }),
  });
  
  return await res.json();
}

// Update an existing attendance record by date and employee_id
export async function updateAttendance(
  date: string, 
  employee_id: string, 
  data: Partial<Attendance>
): Promise<Attendance> {
  const res = await fetch(N8N_ATTENDANCE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      operation: "update", 
      lookupKeys: {
        date,
        employee_id
      },
      data: {
        ...data,
        updated_at: new Date().toISOString()
      } 
    }),
  });
  
  return await res.json();
}

// Delete an attendance record by date and employee_id
export async function deleteAttendance(date: string, employee_id: string): Promise<void> {
  await fetch(N8N_ATTENDANCE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      operation: "delete", 
      lookupKeys: {
        date,
        employee_id
      }
    }),
  });
}

// EMPLOYEE METHODS

// Read all employees
export async function readEmployees(): Promise<Employee[]> {
  const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "read" }),
  });
  
  const data = await res.json();
  if (Array.isArray(data)) {
    // Ensure each employee has the correct paymentType
    return data.map(emp => ({
      ...emp,
      paymentType: emp.paymentType === "Monthly" || emp.paymentType === "Daily" 
        ? emp.paymentType 
        : "Monthly" // Default to Monthly if invalid
    }));
  }
  return [];
}

// Add a new employee
export async function addEmployee(data: EmployeeInput): Promise<Employee> {
  const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "create", data }),
  });
  
  return await res.json();
}

// Update an existing employee
export async function updateEmployee(id: string, data: EmployeeInput): Promise<Employee> {
  const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "update", id, data }),
  });
  
  return await res.json();
}

// Delete an employee
export async function deleteEmployee(id: string): Promise<void> {
  await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "delete", id }),
  });
}

// AUTHENTICATION METHODS

// Authenticate a user
export async function getUserByEmailAndPassword(email: string, password: string): Promise<GoogleSheetsUser | null> {
  const res = await fetch(N8N_AUTH_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await res.json();
  if (data && data.id) {
    // Add name property if not present
    if (!data.name) {
      data.name = `${data.firstName || ''} ${data.lastName || ''}`.trim() || data.email;
    }
    return data;
  }
  return null;
}
