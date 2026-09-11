import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, getApiErrorMessage } from "../../lib/api";
import type { Department } from "../../lib/types";
import { useToast } from "../../context/ToastContext";

const PRIORITIES = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;

export const NewComplaint = () => {
  const navigate = useNavigate();
  const { push } = useToast();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [form, setForm] = useState({
    departmentId: "",
    category: "",
    title: "",
    description: "",
    location: "",
    priority: "MEDIUM" as (typeof PRIORITIES)[number],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/departments").then((res) => {
      setDepartments(res.data.data);
      if (res.data.data.length) {
        setForm((f) => ({ ...f, departmentId: res.data.data[0].id }));
      }
    });
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/complaints", form);
      push("Complaint filed successfully.");
      navigate(`/citizen/complaints/${data.data.id}`);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h2 className="font-display text-xl font-semibold text-ink">File a complaint</h2>
      <p className="mt-1 text-sm text-ink-soft">Be specific — it helps the right team act fast.</p>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-ink-soft">Department</span>
          <select
            value={form.departmentId}
            onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
            className="rounded-2xl border border-rule shadow-sm bg-paper-raised px-3 py-2.5 text-sm text-ink outline-none focus:border-teal"
          >
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-ink-soft">Category</span>
          <input
            required
            placeholder="e.g. Road Damage"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="rounded-2xl border border-rule shadow-sm bg-paper-raised px-3 py-2.5 text-sm text-ink outline-none focus:border-teal"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-ink-soft">Title</span>
          <input
            required
            minLength={5}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-2xl border border-rule shadow-sm bg-paper-raised px-3 py-2.5 text-sm text-ink outline-none focus:border-teal"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-ink-soft">Description</span>
          <textarea
            required
            minLength={10}
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="rounded-2xl border border-rule shadow-sm bg-paper-raised px-3 py-2.5 text-sm text-ink outline-none focus:border-teal"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-ink-soft">Location</span>
          <input
            required
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="rounded-2xl border border-rule shadow-sm bg-paper-raised px-3 py-2.5 text-sm text-ink outline-none focus:border-teal"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-ink-soft">Priority</span>
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value as typeof form.priority })}
            className="rounded-2xl border border-rule shadow-sm bg-paper-raised px-3 py-2.5 text-sm text-ink outline-none focus:border-teal"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0) + p.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </label>

        {error && (
          <p className="rounded-xl border-l-4 border-alert bg-alert-soft px-3 py-2 text-sm text-ink">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !form.departmentId}
          className="mt-2 self-start rounded-xl gradient-brand px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Filing…" : "File complaint"}
        </button>
      </form>
    </div>
  );
};
