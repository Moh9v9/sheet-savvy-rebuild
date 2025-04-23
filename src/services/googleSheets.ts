import { v4 as uuidv4 } from "uuid";
/**
 * Simulated Google Sheets service with user authentication and employee data.
 * In real life, this would use Google Sheets API to check credentials and fetch data.
 */

export interface GoogleSheetsUser {
  id: string;
  name: string;
  email: string;
  password: string; // NOTE: only for demo/mock; NEVER store password plaintext in real projects
}

export interface EmployeeRow {
  id: string;
  fullName: string;
  iqamaNo: string;
  project: string;
  location: string;
  jobTitle: string;
  paymentType: string;
  rateOfPayment: string;
  sponsorship: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const sampleUsers: GoogleSheetsUser[] = [
  { id: '1', name: 'Jane Doe', email: 'jane@example.com', password: 'pass1234' },
  { id: '2', name: 'John Smith', email: 'john@example.com', password: 'supersecret' },
];

// TEMP: sample employees. In real life fetch from Google Sheets.
const sampleEmployees: EmployeeRow[] = [
  {
    id: "1",
    fullName: "Abdul Rahman",
    iqamaNo: "2345523345",
    project: "Blue Sky",
    location: "Riyadh",
    jobTitle: "Engineer",
    paymentType: "Monthly",
    rateOfPayment: "8000",
    sponsorship: "Company",
    status: "Active",
    created_at: "2024-04-01",
    updated_at: "2024-04-20"
  },
  {
    id: "2",
    fullName: "Mansour Al-Harbi",
    iqamaNo: "987654321",
    project: "Greenline",
    location: "Jeddah",
    jobTitle: "Supervisor",
    paymentType: "Hourly",
    rateOfPayment: "50",
    sponsorship: "Private",
    status: "Archived",
    created_at: "2024-03-02",
    updated_at: "2024-04-15"
  },
  // ... more sample data as needed
];

export async function getUserByEmailAndPassword(
  email: string,
  password: string
): Promise<GoogleSheetsUser | null> {
  // In real app: replace with Google Sheets API call and password hashing!
  // Simulate network delay:
  await new Promise((res) => setTimeout(res, 400));
  return sampleUsers.find(
    (u) => u.email === email.toLowerCase() && u.password === password
  ) || null;
}

// -- NEW: Read Employees from Google Sheets (simulate) --
export async function readEmployees(): Promise<EmployeeRow[]> {
  await new Promise((res) => setTimeout(res, 400));
  // In real app, call Sheets API
  return sampleEmployees;
}

export async function addEmployee(row: Omit<EmployeeRow, "updated_at"> & { updated_at?: string }): Promise<void> {
  // In a real app: Google Sheets API call to append row.
  await new Promise(res => setTimeout(res, 400));
  // For the sample mock: push to array (for demo; not persisted).
  (sampleEmployees as EmployeeRow[]).push({
    ...row,
    updated_at: row.updated_at ?? "",
  });
}
