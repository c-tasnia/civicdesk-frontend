import { DashboardShell } from "../../components/DashboardShell";

const ITEMS = [
  { to: "/citizen", label: "Overview", end: true },
  { to: "/citizen/new", label: "File complaint" },
  { to: "/citizen/services", label: "Services" },
];

export const CitizenLayout = () => (
  <DashboardShell title="Citizen dashboard" items={ITEMS} />
);
