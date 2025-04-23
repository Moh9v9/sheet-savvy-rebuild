// src/services/googleSheets.ts

const N8N_USERS_WEBHOOK = "https://n8n.moh9v9.com/webhook/get-users";

export type GoogleSheetsUser = {
  id: string;
  email: string;
  password: string;
  role?: string;
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
