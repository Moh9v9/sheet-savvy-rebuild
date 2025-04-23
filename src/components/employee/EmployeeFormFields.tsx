
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmployeeFormValues } from "@/types/employee";

interface EmployeeFormFieldsProps {
  form: UseFormReturn<EmployeeFormValues>;
  isEditing: boolean;
}

export function EmployeeFormFields({ form, isEditing }: EmployeeFormFieldsProps) {
  const { register, setValue } = form;

  return (
    <div className="space-y-4">
      <div>
        <Label>Full Name</Label>
        <Input {...register("fullName")} disabled={!isEditing} />
      </div>
      
      <div>
        <Label>Iqama No</Label>
        <Input {...register("iqamaNo")} disabled={!isEditing} />
      </div>

      <div>
        <Label>Project</Label>
        <Input {...register("project")} disabled={!isEditing} />
      </div>

      <div>
        <Label>Location</Label>
        <Input {...register("location")} disabled={!isEditing} />
      </div>

      <div>
        <Label>Job Title</Label>
        <Input {...register("jobTitle")} disabled={!isEditing} />
      </div>

      <div>
        <Label>Payment Type</Label>
        <Select
          disabled={!isEditing}
          value={form.getValues().paymentType}
          onValueChange={(value) => setValue("paymentType", value as "Monthly" | "Daily")}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Monthly">Monthly</SelectItem>
            <SelectItem value="Daily">Daily</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Rate of Payment</Label>
        <Input {...register("rateOfPayment")} disabled={!isEditing} />
      </div>

      <div>
        <Label>Sponsorship</Label>
        <Select
          disabled={!isEditing}
          value={form.getValues().sponsorship}
          onValueChange={(value) => setValue("sponsorship", value as "YDM co" | "YDM est" | "Outside")}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="YDM co">YDM co</SelectItem>
            <SelectItem value="YDM est">YDM est</SelectItem>
            <SelectItem value="Outside">Outside</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Status</Label>
        <Select
          disabled={!isEditing}
          value={form.getValues().status}
          onValueChange={(value) => setValue("status", value as "Active" | "Archived")}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
