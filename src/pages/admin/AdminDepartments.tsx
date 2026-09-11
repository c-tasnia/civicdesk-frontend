import { useEffect, useState } from "react";
import { api, getApiErrorMessage } from "../../lib/api";
import type { Department } from "../../lib/types";
import { useToast } from "../../context/ToastContext";

export const AdminDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const { push } = useToast();

  const load = () => {
    api.get("/departments").then((res) => setDepartments(res.data.data));
  };

  useEffect(() => {
    load();
    setLoading(false);
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/departments", { name, description: description || undefined });
      push("Department created.");
      setName("");
      setDescription("");
      load();
    } catch (err) {
      push(getApiErrorMessage(err), "error");
    }
  };

  if (loading) return <p className="text-sm text-slate">Loading…</p>;

  return (
    <div className="max-w-xl">
      <h2 className="font-display text-xl font-semibold text-ink">Departments</h2>

      <div className="mt-6 rounded-2xl border border-rule shadow-sm">
        {departments.map((d, i) => (
          <div
            key={d.id}
            className={`px-5 py-3.5 ${i !== departments.length - 1 ? "border-b border-rule" : ""}`}
          >
            <p className="text-sm text-ink">{d.name}</p>
            {d.description && <p className="mt-0.5 text-xs text-slate">{d.description}</p>}
          </div>
        ))}
      </div>

      <form onSubmit={create} className="mt-6 flex flex-col gap-3 rounded-2xl border border-rule shadow-sm p-5">
        <p className="text-sm font-medium text-ink">Add a department</p>
        <input
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-2xl border border-rule shadow-sm bg-paper-raised px-3 py-2 text-sm text-ink outline-none focus:border-teal"
        />
        <input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
