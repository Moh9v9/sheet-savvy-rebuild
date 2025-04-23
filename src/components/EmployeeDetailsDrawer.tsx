
import React from "react";
import { format } from "date-fns";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee";
import { useEmployeeForm } from "@/hooks/useEmployeeForm";
import { X } from "lucide-react";
import { EmployeeFormFields } from "./employee/EmployeeFormFields";
import { EmployeeActions } from "./employee/EmployeeActions";
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

  const onSuccess = () => {
    setIsEditing(false);
    onClose();
  };

  const { form, onSubmit } = useEmployeeForm({
    employee,
    onSuccess,
    onOpenChange: onClose
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await form.handleSubmit(onSubmit)();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    form.reset();
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

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <EmployeeFormFields form={form} isEditing={isEditing} />

            <div className="text-sm text-muted-foreground space-y-1">
              <p>Created: {format(new Date(employee.created_at), "PPpp")}</p>
              <p>Last updated: {format(new Date(employee.updated_at), "PPpp")}</p>
            </div>

            <EmployeeActions
              isEditing={isEditing}
              isSaving={isSaving}
              onEdit={() => setIsEditing(true)}
              onCancelEdit={handleCancelEdit}
              onDelete={handleDelete}
              onSubmit={handleSubmit}
            />
          </form>
        </SheetContent>
      </Sheet>

      <DeleteEmployeeDialog
        employee={employee}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirmDelete={onEmployeeDeleted}
        isDeleting={isDeleting}
      />
    </>
  );
}
