export function parseLocalDate(value) {
  if (!value) return null;
  const [y,m,d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}
export function formatDate(value) {
  const d = parseLocalDate(value);
  return d ? d.toLocaleDateString(undefined, { month:"short", day:"numeric", year:"numeric" }) : "No date";
}
export function getDaysUntil(value) {
  const due = parseLocalDate(value);
  if (!due) return null;
  const today = new Date(); today.setHours(0,0,0,0); due.setHours(0,0,0,0);
  return Math.ceil((due - today) / 86400000);
}
export function getUrgencyLabel(value, status) {
  if ((status || "").toUpperCase() === "COMPLETED") return "Completed";
  const days = getDaysUntil(value);
  if (days === null) return "Upcoming";
  if (days < 0) return "Overdue";
  if (days <= 1) return "Due Soon";
  return "Upcoming";
}
