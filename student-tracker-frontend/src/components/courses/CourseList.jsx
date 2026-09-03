import CourseItem from "./CourseItem";
import EmptyState from "../common/EmptyState";
export default function CourseList({courses,onEdit,onDelete}) {
  if (!courses.length) return <EmptyState title="No courses found" message="Try another search or add a new course."/>;
  return <section className="data-table" aria-label="Courses">
    <div className="data-row table-header courses-row"><span>Course Code</span><span>Course Name</span><span>Instructor</span><span>Actions</span></div>
    {courses.map(c => <CourseItem key={c.id} course={c} onEdit={onEdit} onDelete={onDelete}/>)}
  </section>;
}
