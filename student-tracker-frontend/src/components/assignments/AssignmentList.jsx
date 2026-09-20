import AssignmentItem from "./AssignmentItem";
import EmptyState from "../common/EmptyState";

export default function AssignmentList({ assignments, onDelete }) {
  // Show a helpful message when there are no assignments to display
  if (!assignments.length) {
    return (
      <EmptyState
        title="No assignments found"
        message="Try another filter or add a new assignment."
      />
    );
  }

  return (
    <section
      className="data-table"
      aria-label="Assignments"
    >
      <div className="data-row table-header assignments-row">
        <span>Title</span>
        <span>Course</span>
        <span>Due Date</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {assignments.map((assignment) => (
        <AssignmentItem
          key={assignment.id}
          assignment={assignment}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}