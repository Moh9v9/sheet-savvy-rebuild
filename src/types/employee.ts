
export type EmployeeFormValues = {
  fullName: string;
  iqamaNo: string;
  project: string;
  location: string;
  jobTitle: string;
  paymentType: "Monthly" | "Daily";  // Removed "Hourly"
  rateOfPayment: string;
  sponsorship: "YDM co" | "YDM est" | "Outside";
  status: "Active" | "Archived";
};

export type Employee = EmployeeFormValues & {
  id: string;
  created_at: string;
  updated_at: string;
};

export type EmployeeInput = EmployeeFormValues & {
  id: string;
  created_at: string;
  updated_at: string;
};

