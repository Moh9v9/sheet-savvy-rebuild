
/**
 * Simulated Google Sheets service with user authentication.
 * In real life, this would use Google Sheets API to check credentials.
 */

export interface GoogleSheetsUser {
  id: string;
  name: string;
  email: string;
  password: string; // NOTE: only for demo/mock; NEVER store password plaintext in real projects
}

const sampleUsers: GoogleSheetsUser[] = [
  { id: '1', name: 'Jane Doe', email: 'jane@example.com', password: 'pass1234' },
  { id: '2', name: 'John Smith', email: 'john@example.com', password: 'supersecret' },
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
