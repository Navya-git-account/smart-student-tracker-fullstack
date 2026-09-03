import { useEffect, useState } from "react";
import { assignmentApi } from "../services/api";
import { sampleAssignments } from "../data/sampleData";
import { formatDate } from "../utils/date";
export default function CalendarPage() {
  const [assignments,setAssignments]=useState([]);
  useEffect(()=>{assignmentApi.getAll().then(setAssignments).catch(()=>setAssignments(sampleAssignments));},[]);
  return <section className="page-section">
    <div className="page-heading"><div><h1>Calendar</h1><p>Upcoming assignment dates.</p></div></div>
    <section className="panel"><div className="calendar-month-grid">
      {assignments.map(a=><article className="calendar-event" key={a.id}><strong>{formatDate(a.dueDate)}</strong><span>{a.title}</span></article>)}
    </div></section>
  </section>;
}
