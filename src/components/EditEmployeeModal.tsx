
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { updateEmployee } from "@/services/googleSheets";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface EditEmployeeModalProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  onSuccess(): void;
  employee: Employee | null;
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

type Employee = FormValues & {
  id: string;
  created_at: string;
  updated_at: string;
};

export default function EditEmployeeModal({ open, onOpenChange, onSuccess, employee }: EditEmployeeModalProps) {
  const form = useForm<FormValues>({
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

  const { handleSubmit, control, formState: { isSubmitting }, reset } = form;

  React.useEffect(() => {
    if (employee) {
      reset({
        fullName: employee.fullName,
        iqamaNo: employee.iqamaNo,
        project: employee.project,
        location: employee.location,
        jobTitle: employee.jobTitle,
        paymentType: employee.paymentType as "Monthly" | "Daily",
        rateOfPayment: employee.rateOfPayment?.toString(),
        sponsorship: employee.sponsorship as "YDM co" | "YDM est" | "Outside",
        status: employee.status as "Active" | "Archived"
      });
    }
  }, [employee, reset]);

  const onSubmit = async (values: FormValues) => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} disabled={isSubmitting}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="iqamaNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Iqama Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Iqama number" {...field} disabled={isSubmitting}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name" {...field} disabled={isSubmitting}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} disabled={isSubmitting}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job title" {...field} disabled={isSubmitting}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="paymentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="rateOfPayment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate of Payment</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter rate of payment" 
                      {...field} 
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="sponsorship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sponsorship</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sponsorship" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="YDM co">YDM co</SelectItem>
                      <SelectItem value="YDM est">YDM est</SelectItem>
                      <SelectItem value="Outside">Outside</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Employee"}
              </Button>
              <DialogClose asChild>
                <Button variant="outline" type="button" disabled={isSubmitting}>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
