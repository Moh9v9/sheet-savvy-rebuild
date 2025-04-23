
import { Attendance } from "@/types/attendance";

const N8N_ATTENDANCE_WEBHOOK = "https://n8n.moh9v9.com/webhook/get-attendance";

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
