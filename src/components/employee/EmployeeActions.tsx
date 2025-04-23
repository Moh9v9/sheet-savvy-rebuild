
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, Trash2 } from "lucide-react";

interface EmployeeActionsProps {
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  onSubmit: (e?: React.FormEvent) => void;  // Updated to accept an optional FormEvent
}

export function EmployeeActions({
  isEditing,
  isSaving,
  onEdit,
  onCancelEdit,
  onDelete,
  onSubmit
}: EmployeeActionsProps) {
  return (
    <div className="flex justify-between pt-4">
      <Button
        type="button"
        variant="destructive"
        onClick={onDelete}
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
            onClick={onCancelEdit}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={() => onSubmit()} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          onClick={onEdit}
          disabled={isSaving}
        >
          Edit Details
        </Button>
      )}
    </div>
  );
}
