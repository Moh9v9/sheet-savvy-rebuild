import { useForm } from "react-hook-form";
import { Employee, EmployeeFormValues, EmployeeInput } from "@/types/employee";
import { addEmployee, updateEmployee } from "@/services/googleSheets";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

type UseEmployeeFormProps = {
  employee?: Employee | null;
  onSuccess: () => void;
  onOpenChange: (open: boolean) => void;
};

export const useEmployeeForm = ({
  employee,
  onSuccess,
  onOpenChange
}: UseEmployeeFormProps) => {
  const form = useForm<EmployeeFormValues>({
    defaultValues: {
      fullName: "",
      iqamaNo: "",
      project: "",
      location: "",
      jobTitle: "",
      paymentType: "Monthly",
      rateOfPayment: "",
      sponsorship: "YDM co",
      status: "Active"
    }
  });

  // Use useEffect to update form values when employee data changes
  useEffect(() => {
    if (employee) {
      // Reset form with employee data
      form.reset({
        fullName: employee.fullName || "",
        iqamaNo: employee.iqamaNo || "",
        project: employee.project || "",
        location: employee.location || "",
        jobTitle: employee.jobTitle || "",
        paymentType: employee.paymentType || "Monthly",
        rateOfPayment: employee.rateOfPayment?.toString() || "",
        sponsorship: employee.sponsorship || "YDM co",
        status: employee.status || "Active"
      });
    }
  }, [employee, form]);

  const onSubmit = async (values: EmployeeFormValues) => {
    try {
      const currentDate = new Date().toISOString().slice(0, 10);
      
      if (employee?.id) {
        // Update existing employee
        const updateData: EmployeeInput = {
          ...values,
          id: employee.id,
          created_at: employee.created_at,
          updated_at: currentDate
        };
        
        await updateEmployee(employee.id, updateData);
        toast.success("Employee updated successfully!");
      } else {
        // Add new employee
        const newEmployee: EmployeeInput = {
          id: uuidv4(),
          ...values,
          created_at: currentDate,
          updated_at: currentDate
        };
        
        await addEmployee(newEmployee);
        toast.success("Employee added successfully!");
        form.reset();
      }
      
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      console.error("Failed to handle employee:", err);
      toast.error(employee?.id ? "Failed to update employee" : "Failed to add employee");
    }
  };

  return { form, onSubmit };
};
