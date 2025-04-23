// src/services/googleSheets.ts

const N8N_EMPLOYEES_WEBHOOK = "https://n8n.moh9v9.com/webhook/employees";
const N8N_USERS_WEBHOOK = "https://n8n.moh9v9.com/webhook/get-users"; // إذا عندك Webhook منفصل لليوزرز استعمله، أو استخدم نفس employees إذا كلهم في نفس الـ Sheet

export type GoogleSheetsUser = {
  id: string;
  email: string;
  password: string;
  role?: string; // admin, user, إلخ
  fullName?: string;
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
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
};

// Helper to call n8n webhook
async function callEmployeesApi(operation: string, payload?: any): Promise<any> {
  try {
    const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ operation, ...payload }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`n8n API error: ${res.status} - ${errText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("n8n API error:", error);
    return [];
  }
}

// قراءة كل الموظفين
export async function readEmployees(): Promise<Employee[]> {
  const rows = await callEmployeesApi("read");
  if (Array.isArray(rows) && Array.isArray(rows[0])) {
    const headers = rows[0];
    return rows.slice(1).map((row: any[]) =>
      Object.fromEntries(headers.map((key, i) => [key, row[i] || ""]))
    );
  }
  return Array.isArray(rows) ? rows : [];
}

// إضافة موظف جديد
export async function addEmployee(employee: Employee): Promise<any> {
  return await callEmployeesApi("add", employee);
}

// تعديل موظف
export async function updateEmployee(employee: Employee): Promise<any> {
  return await callEmployeesApi("update", employee);
}

// حذف موظف
export async function deleteEmployee(id: string): Promise<any> {
  return await callEmployeesApi("delete", { id });
}

// ✅ احصل على يوزر بالبريد وكلمة السر (للدخول)
export async function getUserByEmailAndPassword(email: string, password: string): Promise<GoogleSheetsUser | null> {
  try {
    // إذا عندك n8n Workflow خاص باليوزرز استخدمه، أو أرسل العملية للـ employees إذا كلهم بنفس الشيت
    const res = await fetch(N8N_USERS_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ operation: "login", email, password }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    // توقع أن الـ Workflow يرجع {user: {...}} أو [] أو null
    if (!data) return null;
    if (Array.isArray(data) && data.length > 0) return data[0];
    if (data.user) return data.user;
    return data;
  } catch (error) {
    console.error("Error in getUserByEmailAndPassword:", error);
    return null;
  }
}
