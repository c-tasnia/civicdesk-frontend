import { DashboardShell } from "../../components/DashboardShell";

const ITEMS = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/departments", label: "Departments" },
  { to: "/admin/service-types", label: "Service types" },
];

export const AdminLayout = () => <DashboardShell title="Admin dashboard" items={ITEMS} />;
