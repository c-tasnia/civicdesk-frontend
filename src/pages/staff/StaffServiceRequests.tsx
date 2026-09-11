import { useEffect, useState } from "react";
import { api, getApiErrorMessage } from "../../lib/api";
import type { ServiceRequest } from "../../lib/types";
import { StatusStamp } from "../../components/StatusStamp";
import { useToast } from "../../context/ToastContext";

const NEXT_STATUS: Record<string, string[]> = {
  PENDING_PAYMENT: [],
  PAID: ["PROCESSING"],
  PROCESSING: ["APPROVED", "REJECTED"],
  APPROVED: ["COMPLETED"],
  REJECTED: [],
  COMPLETED: [],
};

export const StaffServiceRequests = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { push } = useToast();

  const load = () => {
    api
      .get("/service-requests?limit=50")
      .then((res) => setRequests(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await api.patch(`/service-requests/${id}/status`, { status });
      push("Status updated.");
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
      <h2 className="font-display text-xl font-semibold text-ink">Service requests</h2>
      <p className="mt-1 text-sm text-ink-soft">Applications paid and awaiting processing.</p>

      {requests.length === 0 ? (
        <p className="mt-6 text-sm text-slate">Nothing to process right now.</p>
      ) : (
        <div className="mt-6 rounded-2xl border border-rule shadow-sm">
          {requests.map((r, i) => {
            const options = NEXT_STATUS[r.status] ?? [];
            return (
              <div
                key={r.id}
                className={`flex items-center justify-between gap-4 px-5 py-4 ${
                  i !== requests.length - 1 ? "border-b border-rule" : ""
                }`}
              >
                <div>
                  <p className="text-sm text-ink">{r.serviceType.name}</p>
                  <p className="mt-0.5 text-xs text-slate">{r.citizen?.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusStamp status={r.status} />
                  {options.length > 0 && (
                    <select
                      disabled={updatingId === r.id}
                      value=""
                      onChange={(e) => e.target.value && updateStatus(r.id, e.target.value)}
                      className="rounded-2xl border border-rule shadow-sm bg-paper-raised px-2 py-1.5 text-xs text-ink outline-none focus:border-teal"
                    >
                      <option value="">Update…</option>
                      {options.map((o) => (
                        <option key={o} value={o}>
                          {o}
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
