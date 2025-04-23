
import { useForm } from "react-hook-form";
import { Employee, EmployeeFormValues, EmployeeInput } from "@/types/employee";
import { addEmployee, updateEmployee } from "@/services/googleSheets";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

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
      fullName: employee?.fullName ?? "",
      iqamaNo: employee?.iqamaNo ?? "",
      project: employee?.project ?? "",
      location: employee?.location ?? "",
      jobTitle: employee?.jobTitle ?? "",
      paymentType: employee?.paymentType as "Monthly" | "Daily" ?? "Monthly",
      rateOfPayment: employee?.rateOfPayment?.toString() ?? "",
      sponsorship: employee?.sponsorship as "YDM co" | "YDM est" | "Outside" ?? "YDM co",
      status: employee?.status as "Active" | "Archived" ?? "Active"
    }
  });

  const onSubmit = async (values: EmployeeFormValues) => {
    try {
      if (employee?.id) {
        // Update existing employee
        const response = await updateEmployee(employee.id, {
          ...values,
          id: employee.id,
          updated_at: new Date().toISOString().slice(0, 10)
        } as EmployeeInput);
        
        console.log("Employee update response:", response);
        toast.success("Employee updated successfully!");
      } else {
        // Add new employee
        const response = await addEmployee({
          id: uuidv4(),
          ...values,
          created_at: new Date().toISOString().slice(0, 10),
          updated_at: ""
        } as EmployeeInput);
        
        console.log("Employee add response:", response);
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

