import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, getApiErrorMessage } from "../../lib/api";
import type { ServiceRequest } from "../../lib/types";
import { StatusStamp } from "../../components/StatusStamp";
import { useToast } from "../../context/ToastContext";

export const ServiceRequestDetail = () => {
  const { id } = useParams();
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const { push } = useToast();

  const load = () => {
    api
      .get(`/service-requests/${id}`)
      .then((res) => setRequest(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, [id]);

  const payNow = async () => {
    setPaying(true);
    try {
      const { data } = await api.post("/payments/initiate", { serviceRequestId: id });
      window.location.href = data.data.gatewayUrl;
    } catch (err) {
      push(getApiErrorMessage(err), "error");
      setPaying(false);
    }
  };

  if (loading) return <p className="text-sm text-slate">Loading…</p>;
  if (!request) return <p className="text-sm text-alert">Request not found.</p>;

  return (
    <div className="max-w-lg">
      <Link to="/citizen" className="text-sm text-teal underline underline-offset-2">
        ← Back to overview
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-slate">{request.serviceType.department?.name}</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-ink">
            {request.serviceType.name}
          </h2>
        </div>
        <StatusStamp status={request.status} />
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-rule shadow-sm px-5 py-4 text-sm">
        <div>
          <dt className="text-xs text-slate">Fee</dt>
          <dd className="mt-0.5 font-mono text-ink">৳{request.serviceType.fee}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate">Filed</dt>
          <dd className="mt-0.5 text-ink">{new Date(request.createdAt).toLocaleDateString()}</dd>
        </div>
      </dl>

      {request.status === "PENDING_PAYMENT" && (
        <button
          onClick={payNow}
          disabled={paying}
          className="mt-6 rounded-xl gradient-brand px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:opacity-90 disabled:opacity-60"
        >
          {paying ? "Redirecting…" : "Pay fee now"}
        </button>
      )}

      {request.status === "PAID" && (
        <p className="mt-6 rounded-xl border-l-4 border-teal bg-paper-raised px-4 py-3 text-sm text-ink">
          Payment received. Staff will begin processing your request.
        </p>
      )}
    </div>
  );
};
