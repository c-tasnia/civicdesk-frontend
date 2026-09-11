import { useEffect, useState } from "react";
import { api, getApiErrorMessage } from "../../lib/api";
import type { Complaint } from "../../lib/types";
import { StatusStamp } from "../../components/StatusStamp";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";

const NEXT_STATUS: Record<string, string[]> = {
  PENDING: [],
  ASSIGNED: ["IN_PROGRESS", "REJECTED"],
  IN_PROGRESS: ["RESOLVED", "REJECTED"],
  RESOLVED: ["CLOSED"],
  REJECTED: [],
  CLOSED: [],
};

export const StaffComplaints = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { push } = useToast();

  const load = () => {
    api
      .get("/complaints?limit=50")
      .then((res) => setComplaints(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await api.patch(`/complaints/${id}/status`, { status });
      push("Status updated.");
      load();
    } catch (err) {
      push(getApiErrorMessage(err), "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const assignToMe = async (id: string) => {
    if (!user) return;
    setUpdatingId(id);
    try {
      await api.patch(`/complaints/${id}/assign`, { staffId: user.id });
      push("Complaint assigned to you.");
      load();
    } catch (err) {
      push(getApiErrorMessage(err), "error");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p className="text-sm text-slate">Loading…</p>;

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink">Department queue</h2>
      <p className="mt-1 text-sm text-ink-soft">
        Complaints filed against your department, awaiting or in progress.
      </p>

      {complaints.length === 0 ? (
        <p className="mt-6 text-sm text-slate">Nothing in the queue right now.</p>
      ) : (
        <div className="mt-6 rounded-2xl border border-rule shadow-sm">
          {complaints.map((c, i) => {
            const options = NEXT_STATUS[c.status] ?? [];
            return (
              <div
                key={c.id}
                className={`flex items-center justify-between gap-4 px-5 py-4 ${
                  i !== complaints.length - 1 ? "border-b border-rule" : ""
                }`}
              >
                <div>
                  <p className="text-sm text-ink">{c.title}</p>
                  <p className="mt-0.5 text-xs text-slate">
                    {c.citizen?.name} · {c.category} · {c.priority}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusStamp status={c.status} />
                  {c.status === "PENDING" && (
                    <button
                      disabled={updatingId === c.id}
                      onClick={() => assignToMe(c.id)}
                      className="rounded-xl border border-teal px-3 py-1.5 text-xs text-teal transition-colors hover:bg-teal hover:text-paper disabled:opacity-60"
                    >
                      Assign to me
                    </button>
                  )}
                  {options.length > 0 && (
                    <select
                      disabled={updatingId === c.id}
                      value=""
                      onChange={(e) => e.target.value && updateStatus(c.id, e.target.value)}
                      className="rounded-2xl border border-rule shadow-sm bg-paper-raised px-2 py-1.5 text-xs text-ink outline-none focus:border-teal"
                    >
                      <option value="">Update…</option>
                      {options.map((o) => (
                        <option key={o} value={o}>
                          {o.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
