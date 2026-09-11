import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import type { Complaint, ServiceRequest } from "../../lib/types";
import { StatusStamp } from "../../components/StatusStamp";

export const CitizenOverview = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/complaints?limit=5"), api.get("/service-requests?limit=5")])
      .then(([c, r]) => {
        setComplaints(c.data.data);
        setRequests(r.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm text-slate">Loading…</p>;

  return (
    <div className="flex flex-col gap-10">
      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-ink">Your complaints</h2>
          <Link to="/citizen/new" className="text-sm text-teal underline underline-offset-2">
            File a new one
          </Link>
        </div>
        {complaints.length === 0 ? (
          <p className="mt-4 text-sm text-ink-soft">
            Nothing filed yet. Report a problem and the right department will pick it up.
          </p>
        ) : (
          <div className="mt-4 rounded-2xl border border-rule shadow-sm">
            {complaints.map((c, i) => (
              <Link
                to={`/citizen/complaints/${c.id}`}
                key={c.id}
                className={`flex items-center justify-between px-4 py-3.5 hover:bg-paper-raised ${
                  i !== complaints.length - 1 ? "border-b border-rule" : ""
                }`}
              >
                <div>
                  <p className="text-sm text-ink">{c.title}</p>
                  <p className="mt-0.5 text-xs text-slate">{c.department.name}</p>
                </div>
                <StatusStamp status={c.status} />
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-ink">Service requests</h2>
          <Link to="/citizen/services" className="text-sm text-teal underline underline-offset-2">
            Apply for a service
          </Link>
        </div>
        {requests.length === 0 ? (
          <p className="mt-4 text-sm text-ink-soft">No service requests yet.</p>
        ) : (
          <div className="mt-4 rounded-2xl border border-rule shadow-sm">
            {requests.map((r, i) => (
              <Link
                to={`/citizen/requests/${r.id}`}
                key={r.id}
                className={`flex items-center justify-between px-4 py-3.5 hover:bg-paper-raised ${
                  i !== requests.length - 1 ? "border-b border-rule" : ""
                }`}
              >
                <div>
                  <p className="text-sm text-ink">{r.serviceType.name}</p>
                  <p className="mt-0.5 font-mono text-xs text-slate">৳{r.serviceType.fee}</p>
                </div>
                <StatusStamp status={r.status} />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
