
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DataTables from "./pages/DataTables";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Login from "./pages/Login";
import { AuthProvider } from "@/context/AuthContext";

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    },
  },
});

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              }
            />
            <Route
              path="/tables"
              element={
                <MainLayout>
                  <DataTables />
                </MainLayout>
              }
            />
            <Route
              path="/employees"
              element={
                <MainLayout>
                  <Employees />
                </MainLayout>
              }
            />
            <Route
              path="/attendance"
              element={
                <MainLayout>
                  <Attendance />
                </MainLayout>
              }
            />
            <Route
              path="/reports"
              element={
                <MainLayout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Reports & Analytics</h1>
                    <p className="text-muted-foreground mt-2">This page is under construction.</p>
                  </div>
                </MainLayout>
              }
            />
            <Route
              path="/documents"
              element={
                <MainLayout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Documents</h1>
                    <p className="text-muted-foreground mt-2">This page is under construction.</p>
                  </div>
                </MainLayout>
              }
            />
            <Route
              path="/settings"
              element={
                <MainLayout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <p className="text-muted-foreground mt-2">This page is under construction.</p>
                  </div>
                </MainLayout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
