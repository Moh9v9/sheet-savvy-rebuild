
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { EmployeeFormFields } from "./employee/EmployeeFormFields";
import { useEmployeeForm } from "@/hooks/useEmployeeForm";
import { Employee } from "@/types/employee";

interface EditEmployeeModalProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  onSuccess(): void;
  employee: Employee | null;
}

export default function EditEmployeeModal({
  open,
  onOpenChange,
  onSuccess,
  employee,
}: EditEmployeeModalProps) {
  const { form, onSubmit } = useEmployeeForm({ employee, onSuccess, onOpenChange });
  const { handleSubmit, formState: { isSubmitting } } = form;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <EmployeeFormFields form={form} isSubmitting={isSubmitting} />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Employee"}
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

