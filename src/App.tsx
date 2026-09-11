import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { CitizenLayout } from "./pages/citizen/CitizenLayout";
import { CitizenOverview } from "./pages/citizen/CitizenOverview";
import { NewComplaint } from "./pages/citizen/NewComplaint";
import { ComplaintDetail } from "./pages/citizen/ComplaintDetail";
import { Services } from "./pages/citizen/Services";
import { ServiceRequestDetail } from "./pages/citizen/ServiceRequestDetail";

import { StaffLayout } from "./pages/staff/StaffLayout";
import { StaffComplaints } from "./pages/staff/StaffComplaints";
import { StaffServiceRequests } from "./pages/staff/StaffServiceRequests";

import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminStats } from "./pages/admin/AdminStats";
import { AdminUsers } from "./pages/admin/AdminUsers";
import { AdminDepartments } from "./pages/admin/AdminDepartments";
import { AdminServiceTypes } from "./pages/admin/AdminServiceTypes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen bg-paper font-body text-ink">
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/citizen"
                element={
                  <ProtectedRoute allow={["CITIZEN"]}>
                    <CitizenLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<CitizenOverview />} />
                <Route path="new" element={<NewComplaint />} />
                <Route path="complaints/:id" element={<ComplaintDetail />} />
                <Route path="services" element={<Services />} />
                <Route path="requests/:id" element={<ServiceRequestDetail />} />
              </Route>

              <Route
                path="/staff"
                element={
                  <ProtectedRoute allow={["STAFF"]}>
                    <StaffLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<StaffComplaints />} />
                <Route path="services" element={<StaffServiceRequests />} />
              </Route>

              <Route
                path="/admin"
                element={
                  <ProtectedRoute allow={["ADMIN"]}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminStats />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="departments" element={<AdminDepartments />} />
                <Route path="service-types" element={<AdminServiceTypes />} />
              </Route>
            </Routes>
          </div>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
