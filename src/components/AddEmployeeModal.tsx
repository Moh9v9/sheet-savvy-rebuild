import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { addEmployee } from "@/services/googleSheets";
import { v4 as uuidv4 } from "uuid";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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
  const form = useForm<FormValues>({
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

  const { handleSubmit, control, formState: { isSubmitting }, reset } = form;

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
                {isSubmitting ? "Adding..." : "Add Employee"}
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
