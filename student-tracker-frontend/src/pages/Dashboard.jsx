import { useEffect, useMemo, useState } from "react";
import { assignmentApi, courseApi } from "../services/api";
import { sampleAssignments, sampleCourses } from "../data/sampleData";
import StatCard from "../components/common/StatCard";
import { calculateGpa } from "../utils/gpa";
import { formatDate, getDaysUntil, getUrgencyLabel } from "../utils/date";

export default function Dashboard() {
  const [assignments,setAssignments] = useState([]);
  const [courses,setCourses] = useState([]);
  const [loading,setLoading] = useState(true);
  const [demo,setDemo] = useState(false);

  useEffect(() => {
    Promise.all([assignmentApi.getAll(), courseApi.getAll()])
      .then(([a,c]) => { setAssignments(a); setCourses(c); })
      .catch(() => { setAssignments(sampleAssignments); setCourses(sampleCourses); setDemo(true); })
      .finally(() => setLoading(false));
  }, []);

  const dueSoon = useMemo(() => assignments.filter(a => {
    if ((a.status || "").toUpperCase() === "COMPLETED") return false;
    const d = getDaysUntil(a.dueDate);
    return d !== null && d >= 0 && d <= 1;
  }), [assignments]);

  const upcoming = useMemo(() => [...assignments]
    .filter(a => (a.status || "").toUpperCase() !== "COMPLETED")
    .sort((a,b) => (a.dueDate || "").localeCompare(b.dueDate || ""))
    .slice(0,4), [assignments]);

  const gpa = calculateGpa(courses);
  if (loading) return <p className="loading-state">Loading dashboard...</p>;

  return <section className="page-section">
    <div className="page-heading"><div><h1>Dashboard</h1><p>Overview of your current academic work.</p></div></div>
    {demo && <p className="demo-banner">Backend is not reachable, so sample data is being shown.</p>}

    <div className="stats-grid">
      <StatCard value={assignments.length} label="Assignments" helper="Total"/>
      <StatCard value={dueSoon.length} label="Due Soon" helper="(24 hrs)"/>
      <StatCard value={courses.length} label="Courses"/>
      <StatCard value={gpa.gpa.toFixed(2)} label="Current GPA"/>
    </div>

    <div className="dashboard-grid">
      <section className="panel upcoming-panel">
        <h2>Upcoming Assignments</h2>
        <div className="upcoming-list">
          {upcoming.length ? upcoming.map(a =>
            <article className="upcoming-card" key={a.id}>
              <strong>{a.title}</strong>
              <span>{a.course || "Course"} · {formatDate(a.dueDate)}</span>
              <span className="mini-status">{getUrgencyLabel(a.dueDate,a.status)}</span>
            </article>
          ) : <p className="muted">No upcoming assignments.</p>}
        </div>
      </section>

      <div className="dashboard-right">
        <section className="panel">
          <h2>Calendar (This Week)</h2>
          <div className="week-grid" aria-label="This week">
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day => <div key={day}><strong>{day}</strong></div>)}
          </div>
        </section>
        <section className="panel">
          <h2>Recent Courses</h2>
          <div className="simple-list">{courses.slice(0,4).map(c => <span key={c.id}>{c.courseName}</span>)}</div>
        </section>
      </div>
    </div>
  </section>;
}
