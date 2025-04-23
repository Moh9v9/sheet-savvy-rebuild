
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
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

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark" attribute="class" enableSystem={false} storageKey="theme">
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
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
