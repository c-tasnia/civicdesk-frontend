import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, getApiErrorMessage } from "../../lib/api";
import type { ServiceType } from "../../lib/types";
import { useToast } from "../../context/ToastContext";

export const Services = () => {
  const [types, setTypes] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { push } = useToast();

  useEffect(() => {
    api
      .get("/service-types")
      .then((res) => setTypes(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  const apply = async (serviceTypeId: string) => {
    setApplyingId(serviceTypeId);
    try {
      const { data } = await api.post("/service-requests", { serviceTypeId });
      push("Service request created — proceed to payment.");
      navigate(`/citizen/requests/${data.data.id}`);
    } catch (err) {
      push(getApiErrorMessage(err), "error");
    } finally {
      setApplyingId(null);
    }
  };

  if (loading) return <p className="text-sm text-slate">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-xl font-semibold text-ink">Available services</h2>
      <p className="mt-1 text-sm text-ink-soft">Apply and pay the fee online — no counter visit.</p>

      <div className="mt-6 rounded-2xl border border-rule shadow-sm">
        {types.map((t, i) => (
          <div
            key={t.id}
            className={`flex items-center justify-between px-5 py-4 ${
              i !== types.length - 1 ? "border-b border-rule" : ""
            }`}
          >
            <div>
              <p className="text-sm text-ink">{t.name}</p>
              <p className="mt-0.5 text-xs text-slate">{t.department?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-teal">৳{t.fee}</span>
              <button
                onClick={() => apply(t.id)}
                disabled={applyingId === t.id}
                className="rounded-xl border border-rule px-3 py-1.5 text-xs font-medium text-ink shadow-sm transition-colors hover:border-teal hover:text-teal disabled:opacity-60"
              >
                {applyingId === t.id ? "Applying…" : "Apply"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
