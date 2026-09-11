import { NavLink, Outlet } from "react-router-dom";
import type { ReactNode } from "react";

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

export const DashboardShell = ({
  title,
  items,
  children,
}: {
  title: string;
  items: NavItem[];
  children?: ReactNode;
}) => {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <p className="text-sm font-semibold tracking-wide text-teal">{title}</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[200px_1fr]">
        <nav className="flex gap-2 border-b border-rule pb-3 lg:flex-col lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "gradient-brand text-white shadow-sm" : "text-ink-soft hover:bg-paper-raised"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div>{children ?? <Outlet />}</div>
      </div>
    </div>
  );
};
