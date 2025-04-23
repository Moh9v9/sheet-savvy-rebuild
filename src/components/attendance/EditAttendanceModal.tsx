
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { format, parse } from "date-fns";
import { Employee } from "@/services/googleSheets";
import { Attendance, updateAttendance } from "@/services/googleSheets";
import { AttendanceStatus } from "@/types/attendance";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

// Define schema for form validation
const attendanceSchema = z.object({
  employee_id: z.string().min(1, "Employee is required"),
  date: z.date({
    required_error: "Date is required",
  }),
  status: z.string().min(1, "Status is required"),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  overtime: z.string().optional(),
  note: z.string().optional(),
});

type AttendanceFormValues = z.infer<typeof attendanceSchema>;

interface EditAttendanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attendance: Attendance | null;
  employees: Employee[];
  onSuccess: () => void;
}

const EditAttendanceModal: React.FC<EditAttendanceModalProps> = ({
  open,
  onOpenChange,
  attendance,
  employees,
  onSuccess,
}) => {
  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      employee_id: "",
      date: new Date(),
      status: "",
      start_time: "",
      end_time: "",
      overtime: "",
      note: "",
    },
  });
  
  // Set form values when attendance changes
  useEffect(() => {
    if (attendance) {
      let date: Date;
      
      try {
        // Try to parse the date string to a Date object
        date = new Date(attendance.date);
        
        // Check if the date is valid
        if (isNaN(date.getTime())) {
          // If not valid, try alternative formats
          date = parse(attendance.date, "yyyy-MM-dd", new Date());
        }
      } catch (error) {
        console.error("Error parsing date:", error);
        date = new Date();
      }
      
      form.reset({
        employee_id: attendance.employee_id,
        date: date,
        status: attendance.status,
        start_time: attendance.start_time || "",
        end_time: attendance.end_time || "",
        overtime: attendance.overtime || "",
        note: attendance.note || "",
      });
    }
  }, [attendance, form]);

  const onSubmit = async (data: AttendanceFormValues) => {
    if (!attendance) return;
    
    try {
      // Find the selected employee to get their name
      const selectedEmployee = employees.find((emp) => emp.id === data.employee_id);
      
      if (!selectedEmployee) {
        toast.error("Selected employee not found");
        return;
      }
      
      // Format the date as a string (YYYY-MM-DD)
      const formattedDate = format(data.date, "yyyy-MM-dd");
      
      // Store the original date and employee_id for lookup
      const originalDate = attendance.date;
      const originalEmployeeId = attendance.employee_id;
      
      // Prepare update data
      const attendanceData: Partial<Attendance> = {
        employee_id: data.employee_id,
        fullName: selectedEmployee.fullName,
        date: formattedDate,
        status: data.status as AttendanceStatus,
        start_time: data.start_time || "",
        end_time: data.end_time || "",
        overtime: data.overtime || "",
        note: data.note || "",
      };
      
      // Update using original date and employee_id as lookup keys
      await updateAttendance(originalDate, originalEmployeeId, attendanceData);
      
      toast.success("Attendance record updated successfully");
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error("Error updating attendance:", error);
      toast.error("Failed to update attendance record");
    }
  };
  
  if (!attendance) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Attendance Record</DialogTitle>
          <DialogDescription>
            Update the attendance record details
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="employee_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an employee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={
                            "w-full pl-3 text-left font-normal"
                          }
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                      <SelectItem value="leave">Leave</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        placeholder="09:00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="end_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        placeholder="17:00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="overtime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overtime (hours)</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="0.0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional notes about attendance"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Record</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAttendanceModal;
