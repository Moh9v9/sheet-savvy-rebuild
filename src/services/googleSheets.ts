
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
  name: string; // Added name property
};

// ATTENDANCE METHODS

// Read all attendance records
export async function readAttendance(): Promise<Attendance[]> {
  const res = await fetch(N8N_ATTENDANCE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "read" }),
  });
  const data = await res.json();
  
  // Log the status values to understand what's being received
  console.log('Attendance Data Status Values:', 
    Array.isArray(data) 
      ? data.map(item => item.status) 
      : data?.status
  );
  
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') return [data];
  return [];
}

// Add a new attendance record
export async function addAttendance(data: Omit<Attendance, "created_at" | "updated_at">): Promise<Attendance> {
  const now = new Date().toISOString();
  const attendanceData = {
    ...data,
    created_at: now,
    updated_at: now
  };
  
  const res = await fetch(N8N_ATTENDANCE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "create", data: attendanceData }),
  });
  
  return await res.json();
}

// Update an existing attendance record
export async function updateAttendance(id: string, data: Partial<Attendance>): Promise<Attendance> {
  const res = await fetch(N8N_ATTENDANCE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      operation: "update", 
      id, 
      data: {
        ...data,
        updated_at: new Date().toISOString()
      } 
    }),
  });
  
  return await res.json();
}

// Delete an attendance record
export async function deleteAttendance(id: string): Promise<void> {
  await fetch(N8N_ATTENDANCE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "delete", id }),
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
