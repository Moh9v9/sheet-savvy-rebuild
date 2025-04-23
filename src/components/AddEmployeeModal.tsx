
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { addEmployee } from "@/services/googleSheets";
import { v4 as uuidv4 } from "uuid";
import { EmployeeFormFields } from "./employee/EmployeeFormFields";
import { EmployeeFormValues } from "@/types/employee";

interface AddEmployeeModalProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  onSuccess(): void;
}

export default function AddEmployeeModal({ open, onOpenChange, onSuccess }: AddEmployeeModalProps) {
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

  const { handleSubmit, formState: { isSubmitting }, reset } = form;

  const onSubmit = async (values: EmployeeFormValues) => {
    try {
      const response = await addEmployee({
        id: uuidv4(),
        ...values,
        created_at: new Date().toISOString().slice(0, 10),
        updated_at: "",
      });
      
      console.log("Employee add response:", response);
      toast.success("Employee added successfully!");
      reset();
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      console.error("Failed to add employee:", err);
      toast.error("Failed to add employee");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <EmployeeFormFields form={form} isSubmitting={isSubmitting} />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Employee"}
              </Button>
              <DialogClose asChild>
                <Button variant="outline" type="button" disabled={isSubmitting}>
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
