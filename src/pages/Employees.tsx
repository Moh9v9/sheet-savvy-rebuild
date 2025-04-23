
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
    <div className="min-h-[70vh] flex flex-col bg-background py-6">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center mb-4 px-4 md:px-0">
        <h1 className="text-2xl font-semibold text-foreground">Employees Management</h1>
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
