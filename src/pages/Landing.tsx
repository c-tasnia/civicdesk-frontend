import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BOARD_TICKETS = [
  { id: "CD-4471", category: "Road Damage", status: "In progress", tone: "amber" },
  { id: "CD-4468", category: "Water Supply", status: "Resolved", tone: "success" },
  { id: "CD-4465", category: "Sanitation", status: "Assigned", tone: "teal" },
  { id: "CD-4460", category: "Trade License", status: "Paid", tone: "success" },
  { id: "CD-4459", category: "Road Damage", status: "Pending", tone: "slate" },
];

const TONE_CLASSES: Record<string, string> = {
  amber: "text-amber bg-amber-soft",
  teal: "text-teal bg-indigo-50",
  success: "text-success bg-emerald-50",
  slate: "text-ink-soft bg-slate-100",
};

const STEPS = [
  {
    title: "File it",
    body: "Describe the problem, drop a pin on the location, attach a photo. Two minutes, done.",
  },
  {
    title: "It's assigned",
    body: "The right department picks it up. You get a ticket number to track it.",
  },
  {
    title: "It's resolved",
    body: "Staff update the status as work happens — nothing sits in a black box.",
  },
];

const SERVICES = [
  { name: "Trade license renewal", fee: "৳500" },
  { name: "Water connection application", fee: "৳1,200" },
  { name: "Waste collection permit", fee: "৳300" },
];

export const Landing = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero */}
      <section className="gradient-glow relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-rule bg-paper-raised px-3 py-1 text-xs font-medium text-ink-soft shadow-sm">
                City services, in the open
              </span>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink lg:text-6xl">
                Report it. Watch it get{" "}
                <span className="gradient-text">fixed.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
                File complaints against city departments and apply for municipal services —
                and actually see what happens next.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to={user ? "/citizen" : "/register"}
                  className="gradient-brand rounded-xl px-7 py-3.5 text-base font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
                >
                  {user ? "Go to dashboard" : "File a complaint"}
                </Link>
                <Link
                  to="/login"
                  className="rounded-xl border border-rule bg-paper-raised px-7 py-3.5 text-base font-semibold text-ink shadow-sm transition-shadow hover:shadow"
                >
                  Sign in
                </Link>
              </div>
            </div>

            {/* Status board card */}
            <div className="rounded-2xl border border-rule bg-paper-raised shadow-xl shadow-indigo-100/60">
              <div className="flex items-center justify-between border-b border-rule px-6 py-4">
                <span className="text-sm font-semibold text-ink">Recent activity</span>
                <span className="flex h-2.5 w-2.5 rounded-full bg-success" />
              </div>
              <ul>
                {BOARD_TICKETS.map((t, i) => (
                  <li
                    key={t.id}
                    className={`flex items-center justify-between px-6 py-4 ${
                      i !== BOARD_TICKETS.length - 1 ? "border-b border-rule" : ""
                    }`}
                    style={{ animation: `fadeIn 0.4s ease-out ${i * 0.08}s both` }}
                  >
                    <div>
                      <p className="font-mono text-xs text-slate">{t.id}</p>
                      <p className="mt-0.5 text-sm font-medium text-ink">{t.category}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${TONE_CLASSES[t.tone]}`}>
                      {t.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-rule bg-paper-raised">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-md text-3xl font-extrabold tracking-tight text-ink">
            Three steps, no waiting room
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-rule p-6 shadow-sm">
                <div className="gradient-brand flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink">
                Municipal services, handled online
              </h2>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-soft">
                Skip the counter. Apply for a permit or license, pay the fee securely, and
                track approval the same way you'd track a complaint.
              </p>
            </div>
            <div className="rounded-2xl border border-rule bg-paper-raised shadow-sm">
              {SERVICES.map((s, i) => (
                <div
                  key={s.name}
                  className={`flex items-center justify-between px-6 py-4 ${
                    i !== SERVICES.length - 1 ? "border-b border-rule" : ""
                  }`}
                >
                  <span className="text-sm font-medium text-ink">{s.name}</span>
                  <span className="font-mono text-sm font-semibold text-teal">{s.fee}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-rule bg-paper-raised">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-ink">
            Your city, accountable by default
          </h2>
          <Link
            to={user ? "/citizen" : "/register"}
            className="gradient-brand mt-9 inline-block rounded-xl px-9 py-3.5 text-base font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
          >
            {user ? "Go to dashboard" : "Create your account"}
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
