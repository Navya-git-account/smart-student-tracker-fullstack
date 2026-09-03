import { Pencil, Trash2 } from "lucide-react";
export default function CourseItem({course,onEdit,onDelete}) {
  return <div className="data-row courses-row">
    <span className="strong-cell">{course.courseCode}</span><span>{course.courseName}</span><span>{course.instructor || "Not set"}</span>
    <span className="row-actions">
      <button className="table-icon-btn" type="button" onClick={() => onEdit(course)} aria-label={`Edit ${course.courseName}`}><Pencil size={16}/></button>
      <button className="table-icon-btn danger" type="button" onClick={() => onDelete(course)} aria-label={`Delete ${course.courseName}`}><Trash2 size={16}/></button>
    </span>
  </div>;
}
