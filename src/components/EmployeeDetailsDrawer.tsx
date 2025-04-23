
import React from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Employee, EmployeeFormValues } from "@/types/employee";
import { updateEmployee, deleteEmployee } from "@/services/googleSheets";
import { toast } from "sonner";
import { X, Save, Trash2 } from "lucide-react";
import { EmployeeFormFields } from "./employee/EmployeeFormFields";
import { DeleteEmployeeDialog } from "./employee/DeleteEmployeeDialog";

interface Props {
  employee: Employee | null;
  open: boolean;
  onClose: () => void;
  onEmployeeDeleted: () => void;
}

export function EmployeeDetailsDrawer({ employee, open, onClose, onEmployeeDeleted }: Props) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const form = useForm<EmployeeFormValues>();

  // Reset form when employee changes
  React.useEffect(() => {
    if (employee) {
      form.reset({
        fullName: employee.fullName,
        iqamaNo: employee.iqamaNo,
        project: employee.project,
        location: employee.location,
        jobTitle: employee.jobTitle,
        paymentType: employee.paymentType,
        rateOfPayment: employee.rateOfPayment,
        sponsorship: employee.sponsorship,
        status: employee.status,
      });
    }
  }, [employee, form.reset]);

  const onSubmit = async (data: EmployeeFormValues) => {
    if (!employee?.id) return;

    setIsSaving(true);
    try {
      await updateEmployee(employee.id, {
        ...data,
        id: employee.id,
        created_at: employee.created_at,
        updated_at: new Date().toISOString()
      });
      toast.success("Employee updated successfully");
      setIsEditing(false);
      onClose();
    } catch (error) {
      toast.error("Failed to update employee");
      console.error("Update error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!employee?.id) return;

    setIsDeleting(true);
    try {
      await deleteEmployee(employee.id);
      toast.success("Employee deleted successfully");
      setShowDeleteDialog(false);
      onEmployeeDeleted();
      onClose();
    } catch (error) {
      toast.error("Failed to delete employee");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!employee) return null;

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="flex flex-row items-center justify-between pb-4">
            <SheetTitle>{employee.fullName}</SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </SheetHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <EmployeeFormFields form={form} isEditing={isEditing} />

            <div className="text-sm text-muted-foreground space-y-1">
              <p>Created: {format(new Date(employee.created_at), "PPpp")}</p>
              <p>Last updated: {format(new Date(employee.updated_at), "PPpp")}</p>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
                disabled={isEditing || isSaving}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Employee
              </Button>
              
              {isEditing ? (
                <div className="space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      form.reset();
                    }}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  disabled={isSaving}
                >
                  Edit Details
                </Button>
              )}
            </div>
          </form>
        </SheetContent>
      </Sheet>

      <DeleteEmployeeDialog
        employee={employee}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirmDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}
