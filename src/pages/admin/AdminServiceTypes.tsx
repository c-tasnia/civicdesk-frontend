import { useEffect, useState } from "react";
import { api, getApiErrorMessage } from "../../lib/api";
import type { Department, ServiceType } from "../../lib/types";
import { useToast } from "../../context/ToastContext";

export const AdminServiceTypes = () => {
  const [types, setTypes] = useState<ServiceType[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [form, setForm] = useState({ name: "", description: "", fee: "", departmentId: "" });
  const [loading, setLoading] = useState(true);
  const { push } = useToast();

  const load = () => {
    Promise.all([api.get("/service-types"), api.get("/departments")]).then(([t, d]) => {
      setTypes(t.data.data);
      setDepartments(d.data.data);
      setForm((f) => ({ ...f, departmentId: f.departmentId || d.data.data[0]?.id || "" }));
    });
  };

  useEffect(() => {
    load();
    setLoading(false);
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/service-types", {
        name: form.name,
        description: form.description || undefined,
        fee: Number(form.fee),
        departmentId: form.departmentId,
      });
      push("Service type created.");
      setForm((f) => ({ ...f, name: "", description: "", fee: "" }));
      load();
    } catch (err) {
      push(getApiErrorMessage(err), "error");
    }
  };

  if (loading) return <p className="text-sm text-slate">Loading…</p>;

  return (
    <div className="max-w-xl">
      <h2 className="font-display text-xl font-semibold text-ink">Service types</h2>

      <div className="mt-6 rounded-2xl border border-rule shadow-sm">
        {types.map((t, i) => (
          <div
            key={t.id}
            className={`flex items-center justify-between px-5 py-3.5 ${
              i !== types.length - 1 ? "border-b border-rule" : ""
            }`}
          >
            <div>
              <p className="text-sm text-ink">{t.name}</p>
              <p className="mt-0.5 text-xs text-slate">{t.department?.name}</p>
            </div>
            <span className="font-mono text-sm text-teal">৳{t.fee}</span>
          </div>
        ))}
      </div>

      <form onSubmit={create} className="mt-6 flex flex-col gap-3 rounded-2xl border border-rule shadow-sm p-5">
        <p className="text-sm font-medium text-ink">Add a service type</p>
        <select
          value={form.departmentId}
          onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
          className="rounded-2xl border border-rule shadow-sm bg-paper-raised px-3 py-2 text-sm text-ink outline-none focus:border-teal"
        >
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-2xl border border-rule shadow-sm bg-paper-raised px-3 py-2 text-sm text-ink outline-none focus:border-teal"
        />
        <input
          required
          type="number"
          min="1"
          placeholder="Fee (BDT)"
          value={form.fee}
          onChange={(e) => setForm({ ...form, fee: e.target.value })}
          className="rounded-2xl border border-rule shadow-sm bg-paper-raised px-3 py-2 text-sm text-ink outline-none focus:border-teal"
        />
        <button
          type="submit"
          className="self-start rounded-xl gradient-brand px-4 py-2 text-sm font-medium text-paper transition-colors hover:opacity-90"
        >
          Create
        </button>
      </form>
    </div>
  );
};
