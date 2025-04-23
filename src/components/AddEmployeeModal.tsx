import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { addEmployee } from "@/services/googleSheets";
import { v4 as uuidv4 } from "uuid";

interface AddEmployeeModalProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  onSuccess(): void;
}

type FormValues = {
  fullName: string;
  iqamaNo: string;
  project: string;
  location: string;
  jobTitle: string;
  paymentType: "Monthly" | "Daily";
  rateOfPayment: string;
  sponsorship: "YDM co" | "YDM est" | "Outside";
  status: "Active" | "Archived";
};

export default function AddEmployeeModal({ open, onOpenChange, onSuccess }: AddEmployeeModalProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <Input placeholder="Full Name" {...register("fullName", { required: true })} disabled={isSubmitting}/>
          {errors.fullName && <div className="text-destructive text-xs">Full Name is required</div>}

          <Input placeholder="Iqama No" {...register("iqamaNo", { required: true })} disabled={isSubmitting}/>
          {errors.iqamaNo && <div className="text-destructive text-xs">Iqama No is required</div>}

          <Input placeholder="Project" {...register("project", { required: true })} disabled={isSubmitting}/>
          {errors.project && <div className="text-destructive text-xs">Project is required</div>}

          <Input placeholder="Location" {...register("location", { required: true })} disabled={isSubmitting}/>
          {errors.location && <div className="text-destructive text-xs">Location is required</div>}

          <Input placeholder="Job Title" {...register("jobTitle", { required: true })} disabled={isSubmitting}/>
          {errors.jobTitle && <div className="text-destructive text-xs">Job Title is required</div>}

          <Select
            onValueChange={value => (value ? (register("paymentType").onChange({ target: { value } }) as any) : null)}
            defaultValue="Monthly"
          >
            <SelectTrigger>
              <SelectValue placeholder="Payment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Daily">Daily</SelectItem>
            </SelectContent>
          </Select>
          {errors.paymentType && <div className="text-destructive text-xs">Payment Type is required</div>}

          <Input
            placeholder="Rate of Payment"
            type="number"
            {...register("rateOfPayment", { required: true, pattern: /^[0-9]+$/ })}
            disabled={isSubmitting}
          />
          {errors.rateOfPayment && <div className="text-destructive text-xs">Rate of Payment is required & must be numeric</div>}

          <Select
            onValueChange={value => (value ? (register("sponsorship").onChange({ target: { value } }) as any) : null)}
            defaultValue="YDM co"
          >
            <SelectTrigger>
              <SelectValue placeholder="Sponsorship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="YDM co">YDM co</SelectItem>
              <SelectItem value="YDM est">YDM est</SelectItem>
              <SelectItem value="Outside">Outside</SelectItem>
            </SelectContent>
          </Select>
          {errors.sponsorship && <div className="text-destructive text-xs">Sponsorship is required</div>}

          <Select
            onValueChange={value => (value ? (register("status").onChange({ target: { value } }) as any) : null)}
            defaultValue="Active"
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <div className="text-destructive text-xs">Status is required</div>}

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Employee"}
            </Button>
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isSubmitting}>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
