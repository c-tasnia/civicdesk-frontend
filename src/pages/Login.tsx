import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getApiErrorMessage } from "../lib/api";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">Sign in</h1>
      <p className="mt-2 text-sm text-ink-soft">Access your complaints and service requests.</p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-ink-soft">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-2xl border border-rule shadow-sm bg-paper-raised px-3 py-2.5 text-sm text-ink outline-none focus:border-teal"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-ink-soft">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-2xl border border-rule shadow-sm bg-paper-raised px-3 py-2.5 text-sm text-ink outline-none focus:border-teal"
          />
        </label>

        {error && (
          <p className="rounded-xl border-l-4 border-alert bg-alert-soft px-3 py-2 text-sm text-ink">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-xl gradient-brand px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-sm text-ink-soft">
        New here?{" "}
        <Link to="/register" className="text-teal underline underline-offset-2">
          Create an account
        </Link>
      </p>
    </div>
  );
};
