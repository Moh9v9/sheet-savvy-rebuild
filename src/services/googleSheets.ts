
// src/services/googleSheets.ts

const N8N_EMPLOYEES_WEBHOOK = "https://n8n.moh9v9.com/webhook/employees";

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

async function callEmployeesApi(operation: string, payload?: any): Promise<any> {
  const res = await fetch(N8N_EMPLOYEES_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operation, ...payload }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`n8n API error: ${res.status} - ${errText}`);
  }

  return await res.json();
}

// قراءة كل الموظفين
export async function readEmployees(): Promise<Employee[]> {
  try {
    const data = await callEmployeesApi("read");
    
    // Handle different response formats
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return [];
      }
      
      // If data is already an array of objects
      if (typeof data[0] === 'object' && !Array.isArray(data[0])) {
        return data;
      }
      
      // If data is an array of arrays (first row is headers)
      if (Array.isArray(data[0])) {
        const headers = data[0];
        return data.slice(1).map((row: any[]) =>
          Object.fromEntries(headers.map((key, i) => [key, row[i] || ""]))
        );
      }
    }
    
    // Return empty array as fallback
    console.error("Unexpected data format from API:", data);
    return [];
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
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
