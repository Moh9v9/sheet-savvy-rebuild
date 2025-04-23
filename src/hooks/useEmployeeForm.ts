
import { useForm } from "react-hook-form";
import { EmployeeFormValues } from "@/types/employee";
import { updateEmployee } from "@/services/googleSheets";
import { toast } from "sonner";

export const useEmployeeForm = (
  employee: Employee | null,
  onSuccess: () => void,
  onOpenChange: (open: boolean) => void
) => {
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
    if (!employee?.id) return;
    
    try {
      const response = await updateEmployee(employee.id, {
        ...values,
        updated_at: new Date().toISOString().slice(0, 10)
      });
      
      console.log("Employee update response:", response);
      toast.success("Employee updated successfully!");
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      console.error("Failed to update employee:", err);
      toast.error("Failed to update employee");
    }
  };

  return { form, onSubmit };
};
