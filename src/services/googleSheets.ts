// src/services/googleSheets.ts

const N8N_USERS_WEBHOOK = "https://n8n.moh9v9.com/webhook/get-users";
const N8N_EMPLOYEES_WEBHOOK = "https://n8n.moh9v9.com/webhook/employees";

export type GoogleSheetsUser = {
  id: string;
  email: string;
  password: string;
  role?: string;
  [key: string]: any;
};

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
  [key: string]: any;
};

// قراءة كل المستخدمين
export async function readUsers(): Promise<GoogleSheetsUser[]> {
  const res = await fetch(N8N_USERS_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "read" }),
  });
  const data = await res.json();
  // أعد البيانات كمصفوفة أو مصفوفة فاضية في حال لا يوجد مستخدمين
  return Array.isArray(data) ? data : [];
}

// إضافة مستخدم جديد
export async function addUser(userData: GoogleSheetsUser): Promise<any> {
  const res = await fetch(N8N_USERS_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "add", ...userData }),
  });
  return res.json();
}

// تحديث مستخدم (يلزم rowIndex)
export async function updateUser(rowIndex: number, userData: Partial<GoogleSheetsUser>): Promise<any> {
  const res = await fetch(N8N_USERS_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "update", rowIndex, ...userData }),
  });
  return res.json();
}

// حذف مستخدم (يلزم rowIndex)
export async function deleteUser(rowIndex: number): Promise<any> {
  const res = await fetch(N8N_USERS_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "delete", rowIndex }),
  });
  return res.json();
}

// التحقق من تسجيل الدخول (Login)
export async function getUserByEmailAndPassword(email: string, password: string): Promise<GoogleSheetsUser | null> {
  const res = await fetch(N8N_USERS_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "login", email, password }),
  });
  const data = await res.json();
  // إذا لم يوجد يرجع null، إذا وجد يرجع بيانات المستخدم
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }
  return null;
}

// قراءة كل الموظفين
export async function readEmployees(): Promise<Employee[]> {
  const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "read" }),
  });
  
  const data = await res.json();
  
  // Make sure we always return an array
  if (Array.isArray(data)) {
    return data;
  } else if (data && typeof data === 'object') {
    // Some APIs might wrap the response in another object
    return Array.isArray(data.data) ? data.data : [];
  }
  
  return [];
}

// إضافة موظف جديد
export async function addEmployee(employeeData: Employee): Promise<any> {
  const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "add", ...employeeData }),
  });
  return res.json();
}

// تحديث موظف
export async function updateEmployee(rowIndex: number, employeeData: Partial<Employee>): Promise<any> {
  const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "update", rowIndex, ...employeeData }),
  });
  return res.json();
}

// حذف موظف
export async function deleteEmployee(rowIndex: number): Promise<any> {
  const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation: "delete", rowIndex }),
  });
  return res.json();
}
