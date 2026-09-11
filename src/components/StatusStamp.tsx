const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-slate-100 text-ink-soft",
  PENDING_PAYMENT: "bg-slate-100 text-ink-soft",
  ASSIGNED: "bg-indigo-50 text-teal",
  PROCESSING: "bg-indigo-50 text-teal",
  PAID: "bg-emerald-50 text-success",
  IN_PROGRESS: "bg-cyan-50 text-amber",
  RESOLVED: "bg-emerald-50 text-success",
  APPROVED: "bg-emerald-50 text-success",
  COMPLETED: "gradient-brand text-white",
  CLOSED: "bg-ink text-white",
  REJECTED: "bg-rose-50 text-alert",
  FAILED: "bg-rose-50 text-alert",
  CANCELLED: "bg-rose-50 text-alert",
};

const LABELS: Record<string, string> = {
  PENDING: "Pending",
  PENDING_PAYMENT: "Awaiting payment",
  ASSIGNED: "Assigned",
  PROCESSING: "Processing",
  PAID: "Paid",
  IN_PROGRESS: "In progress",
  RESOLVED: "Resolved",
  APPROVED: "Approved",
  COMPLETED: "Completed",
  CLOSED: "Closed",
  REJECTED: "Rejected",
  FAILED: "Failed",
  CANCELLED: "Cancelled",
};

export const StatusStamp = ({ status }: { status: string }) => {
  const style = STATUS_STYLES[status] ?? "bg-slate-100 text-ink-soft";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${style}`}>
      {LABELS[status] ?? status}
    </span>
  );
};
