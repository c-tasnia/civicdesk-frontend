import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../lib/api";
import type { Complaint } from "../../lib/types";
import { StatusStamp } from "../../components/StatusStamp";

export const ComplaintDetail = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/complaints/${id}`)
      .then((res) => setComplaint(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-sm text-slate">Loading…</p>;
  if (!complaint) return <p className="text-sm text-alert">Complaint not found.</p>;

  return (
    <div className="max-w-2xl">
      <Link to="/citizen" className="text-sm text-teal underline underline-offset-2">
        ← Back to overview
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-slate">{complaint.department.name}</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-ink">{complaint.title}</h2>
        </div>
        <StatusStamp status={complaint.status} />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-soft">{complaint.description}</p>

      <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-rule shadow-sm px-5 py-4 text-sm">
        <div>
          <dt className="text-xs text-slate">Category</dt>
          <dd className="mt-0.5 text-ink">{complaint.category}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate">Priority</dt>
          <dd className="mt-0.5 text-ink">{complaint.priority}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate">Location</dt>
          <dd className="mt-0.5 text-ink">{complaint.location}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate">Assigned to</dt>
          <dd className="mt-0.5 text-ink">{complaint.assignedStaff?.name ?? "Not yet assigned"}</dd>
        </div>
      </dl>

      <h3 className="mt-8 font-display text-lg font-semibold text-ink">Activity</h3>
      {!complaint.activity || complaint.activity.length === 0 ? (
        <p className="mt-2 text-sm text-slate">No updates yet.</p>
      ) : (
        <ol className="mt-3 flex flex-col gap-3 border-l border-rule pl-4">
          {complaint.activity.map((a) => (
            <li key={a.id} className="text-sm">
              <p className="text-ink">
                {a.fromStatus ? `${a.fromStatus} → ${a.toStatus}` : `Filed — ${a.toStatus}`}
              </p>
              <p className="mt-0.5 font-mono text-xs text-slate">
                {a.actor.name} ({a.actor.role}) · {new Date(a.createdAt).toLocaleString()}
              </p>
              {a.note && <p className="mt-1 text-ink-soft">{a.note}</p>}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
