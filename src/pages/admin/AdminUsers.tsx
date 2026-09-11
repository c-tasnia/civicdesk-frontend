import { useEffect, useState } from "react";
import { api, getApiErrorMessage } from "../../lib/api";
import type { Department } from "../../lib/types";
import { useToast } from "../../context/ToastContext";

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  departmentId: string | null;
}

const ROLES = ["CITIZEN", "STAFF", "ADMIN"];

export const AdminUsers = () => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const { push } = useToast();

  const load = () => {
    Promise.all([api.get("/admin/users?limit=50"), api.get("/departments")]).then(
      ([u, d]) => {
        setUsers(u.data.data.items);
        setDepartments(d.data.data);
      }
    );
  };

  useEffect(() => {
    load();
    setLoading(false);
  }, []);

  const changeRole = async (id: string, role: string, departmentId?: string) => {
    try {
      await api.patch(`/admin/users/${id}/role`, { role, departmentId });
      push("Role updated.");
      load();
    } catch (err) {
      push(getApiErrorMessage(err), "error");
    }
  };

  if (loading) return <p className="text-sm text-slate">Loading…</p>;

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink">Users</h2>
      <div className="mt-6 rounded-2xl border border-rule shadow-sm">
        {users.map((u, i) => (
          <div
            key={u.id}
            className={`flex flex-wrap items-center justify-between gap-3 px-5 py-4 ${
              i !== users.length - 1 ? "border-b border-rule" : ""
            }`}
          >
            <div>
              <p className="text-sm text-ink">{u.name}</p>
              <p className="mt-0.5 text-xs text-slate">{u.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                defaultValue={u.role}
                onChange={(e) => {
                  const role = e.target.value;
                  if (role === "STAFF") {
                    const departmentId = departments[0]?.id;
                    changeRole(u.id, role, departmentId);
                  } else {
                    changeRole(u.id, role);
                  }
                }}
                className="rounded-2xl border border-rule shadow-sm bg-paper-raised px-2 py-1.5 text-xs text-ink outline-none focus:border-teal"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate">
        Assigning STAFF defaults to the first department — reassign the individual's department
        from the API directly if you need a specific one.
      </p>
    </div>
  );
};
