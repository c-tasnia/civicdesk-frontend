import { useEffect, useState } from "react";
import { api } from "../../lib/api";

interface Stats {
  totalUsers: number;
  totalComplaints: number;
  pendingComplaints: number;
  resolvedComplaints: number;
  totalServiceRequests: number;
  totalRevenue: number;
}

const CARDS: { key: keyof Stats; label: string; format?: (n: number) => string }[] = [
  { key: "totalUsers", label: "Registered users" },
  { key: "totalComplaints", label: "Complaints filed" },
  { key: "pendingComplaints", label: "Awaiting assignment" },
  { key: "resolvedComplaints", label: "Resolved or closed" },
  { key: "totalServiceRequests", label: "Service requests" },
  { key: "totalRevenue", label: "Revenue collected", format: (n) => `৳${n}` },
];

export const AdminStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.get("/admin/dashboard-stats").then((res) => setStats(res.data.data));
  }, []);

  if (!stats) return <p className="text-sm text-slate">Loading…</p>;

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink">Overview</h2>
      <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-rule shadow-sm bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <div key={c.key} className="bg-paper-raised px-5 py-6">
            <p className="text-xs text-slate">{c.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold text-ink">
              {c.format ? c.format(stats[c.key]) : stats[c.key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
