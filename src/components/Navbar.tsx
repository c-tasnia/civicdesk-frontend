import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DASHBOARD_PATH: Record<string, string> = {
  CITIZEN: "/citizen",
  STAFF: "/staff",
  ADMIN: "/admin",
};

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper-raised/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-extrabold tracking-tight">
          <span className="gradient-text">CivicDesk</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {user ? (
            <>
              <Link to={DASHBOARD_PATH[user.role]} className="font-medium text-ink-soft hover:text-teal">
                Dashboard
              </Link>
              <span className="hidden text-slate sm:inline">{user.name}</span>
              <button
                onClick={async () => {
                  await logout();
                  navigate("/");
                }}
                className="rounded-xl border border-rule bg-paper-raised px-4 py-2 font-medium text-ink shadow-sm transition-shadow hover:shadow"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-medium text-ink-soft hover:text-teal">
                Sign in
              </Link>
              <Link
                to="/register"
                className="gradient-brand rounded-xl px-4 py-2 font-medium text-white shadow-sm transition-shadow hover:shadow-md"
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
