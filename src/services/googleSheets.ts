// src/services/googleSheets.ts
import { Employee, EmployeeInput } from "@/types/employee";

// روابط الـ n8n Webhook
const N8N_EMPLOYEES_WEBHOOK = "https://n8n.moh9v9.com/webhook/get-employees";
const N8N_USERS_WEBHOOK = "https://n8n.moh9v9.com/webhook/get-users";
const N8N_ATTENDANCE_WEBHOOK = "https://n8n.moh9v9.com/webhook/get-attendance";

// أنواع بيانات المستخدمين
export type GoogleSheetsUser = {
  id: string;
  email: string;
  password: string;
  role?: string;
  [key: string]: any;
};

// أنواع بيانات الحضور
export type Attendance = {
  id: string;
  date: string;
  employee_id: string;
  fullName: string;
  status: string;
  start_time: string;
  end_time: string;
  overtime: string;
  note: string;
  created_at: string;
  updated_at: string;
};

// =========== دوال الموظفين ===========
export async function readEmployees(): Promise<Employee[]> {
  const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "read" }),
  });
  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') return [data];
  return [];
}

export async function addEmployee(employeeData: EmployeeInput): Promise<any> {
  const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "add", ...employeeData }),
  });
  return await res.json();
}

export async function updateEmployee(id: string, employeeData: EmployeeInput): Promise<any> {
  const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "update", id, ...employeeData }),
  });
  return await res.json();
}

export async function deleteEmployee(id: string): Promise<any> {
  const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "delete", id }),
  });
  return await res.json();
}

// =========== دوال المستخدمين ===========
export async function readUsers(): Promise<GoogleSheetsUser[]> {
  const res = await fetch(N8N_USERS_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "read" }),
  });
  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') return [data];
  return [];
}

export async function addUser(userData: GoogleSheetsUser): Promise<any> {
  const res = await fetch(N8N_USERS_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "add", ...userData }),
  });
  return await res.json();
}

export async function updateUser(rowIndex: number, userData: Partial<GoogleSheetsUser>): Promise<any> {
  const res = await fetch(N8N_USERS_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "update", rowIndex, ...userData }),
  });
  return await res.json();
}

export async function deleteUser(rowIndex: number): Promise<any> {
  const res = await fetch(N8N_USERS_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "delete", rowIndex }),
  });
  return await res.json();
}

export async function getUserByEmailAndPassword(email: string, password: string): Promise<GoogleSheetsUser | null> {
  const res = await fetch(N8N_USERS_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "login", email, password }),
  });
  const data = await res.json();
  if (Array.isArray(data) && data.length > 0) return data[0];
  if (data && typeof data === 'object') return data;
  return null;
}

// =========== دوال الحضور ===========
export async function readAttendance(): Promise<Attendance[]> {
  const res = await fetch(N8N_ATTENDANCE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "read" }),
  });
  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') return [data];
  return [];
}

export async function addAttendance(attendanceData: Omit<Attendance, "created_at" | "updated_at">): Promise<any> {
  const res = await fetch(N8N_ATTENDANCE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "add", ...attendanceData }),
  });
  return await res.json();
}

export async function updateAttendance(id: string, attendanceData: Partial<Attendance>): Promise<any> {
  const res = await fetch(N8N_ATTENDANCE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "update", id, ...attendanceData }),
  });
  return await res.json();
}

export async function deleteAttendance(id: string): Promise<any> {
  const res = await fetch(N8N_ATTENDANCE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "delete", id }),
  });
  return await res.json();
}
