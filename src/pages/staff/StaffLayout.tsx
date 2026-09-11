import { DashboardShell } from "../../components/DashboardShell";

const ITEMS = [
  { to: "/staff", label: "Complaints", end: true },
  { to: "/staff/services", label: "Service requests" },
];

export const StaffLayout = () => <DashboardShell title="Staff dashboard" items={ITEMS} />;
