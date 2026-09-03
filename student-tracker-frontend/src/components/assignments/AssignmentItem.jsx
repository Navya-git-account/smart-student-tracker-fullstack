import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate, getUrgencyLabel } from "../../utils/date";
export default function AssignmentItem({assignment,onDelete}) {
  const urgency = getUrgencyLabel(assignment.dueDate, assignment.status);
  return <div className="data-row assignments-row">
    <span className="strong-cell">{assignment.title}</span>
    <span>{assignment.course || assignment.courseName || "Unassigned"}</span>
    <span>{formatDate(assignment.dueDate)}</span>
    <span><span className={`status-pill ${urgency.toLowerCase().replace(" ","-")}`}>{urgency}</span></span>
    <span className="row-actions">
      <Link className="table-icon-btn" to={`/assignments/${assignment.id}/edit`} state={{assignment}} aria-label={`Edit ${assignment.title}`}><Pencil size={16}/></Link>
      <button className="table-icon-btn danger" type="button" onClick={() => onDelete(assignment)} aria-label={`Delete ${assignment.title}`}><Trash2 size={16}/></button>
    </span>
  </div>;
}
