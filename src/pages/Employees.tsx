
import React, { useState } from "react";
import EmployeeTable from "@/components/EmployeeTable";
import AddEmployeeModal from "@/components/AddEmployeeModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Employees = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background py-10">
      <div className="w-full max-w-7xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="mr-2" />
          Add Employee
        </Button>
      </div>
      <EmployeeTable key={refreshKey} />
      <AddEmployeeModal open={isModalOpen} onOpenChange={setModalOpen} onSuccess={handleAdded} />
    </div>
  );
};

export default Employees;
