// src/services/googleSheets.ts

// روابط الـ n8n Webhook
const N8N_EMPLOYEES_WEBHOOK = "https://n8n.moh9v9.com/webhook/get-employees";
const N8N_USERS_WEBHOOK = "https://n8n.moh9v9.com/webhook/get-users";

// ====== [ أنواع البيانات ] ======
export type Employee = {
  id: string;
  fullName: string;
  iqamaNo: string;
  project: string;
  location: string;
  jobTitle: string;
  paymentType: string;
  rateOfPayment: string;
  sponsorship?: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
};

export type GoogleSheetsUser = {
  id: string;
  email: string;
  password: string;
  role?: string;
  [key: string]: any;
};

// ====== [ دوال الموظفين ] ======
export async function readEmployees(): Promise<Employee[]> {
  const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "read" }),
  });
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function addEmployee(employeeData: Employee): Promise<any> {
  const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "add", ...employeeData }),
  });
  return res.json();
}

export async function updateEmployee(rowIndex: number, employeeData: Partial<Employee>): Promise<any> {
  const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "update", rowIndex, ...employeeData }),
  });
  return res.json();
}

export async function deleteEmployee(rowIndex: number): Promise<any> {
  const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "delete", rowIndex }),
  });
  return res.json();
}

// ====== [ دوال المستخدمين ] ======
export async function readUsers(): Promise<GoogleSheetsUser[]> {
  const res = await fetch(N8N_USERS_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "read" }),
  });
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function addUser(userData: GoogleSheetsUser): Promise<any> {
  const res = await fetch(N8N_USERS_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "add", ...userData }),
  });
  return res.json();
}

export async function updateUser(rowIndex: number, userData: Partial<GoogleSheetsUser>): Promise<any> {
  const res = await fetch(N8N_USERS_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "update", rowIndex, ...userData }),
  });
  return res.json();
}

export async function deleteUser(rowIndex: number): Promise<any> {
  const res = await fetch(N8N_USERS_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "delete", rowIndex }),
  });
  return res.json();
}

export async function getUserByEmailAndPassword(email: string, password: string): Promise<GoogleSheetsUser | null> {
  const res = await fetch(N8N_USERS_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "login", email, password }),
  });
  const data = await res.json();
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }
  return null;
}
