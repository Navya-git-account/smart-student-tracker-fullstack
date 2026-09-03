import { useEffect, useMemo, useState } from "react";
import { assignmentApi } from "../services/api";
import { sampleAssignments } from "../data/sampleData";
import { getDaysUntil } from "../utils/date";
export default function Notifications() {
  const [assignments,setAssignments]=useState([]);
  useEffect(()=>{assignmentApi.getAll().then(setAssignments).catch(()=>setAssignments(sampleAssignments));},[]);
  const urgent=useMemo(()=>assignments.filter(a=>{const d=getDaysUntil(a.dueDate);return (a.status||"").toUpperCase()!=="COMPLETED"&&d!==null&&d>=0&&d<=1;}),[assignments]);
  return <section className="page-section">
    <div className="page-heading"><div><h1>Notifications</h1><p>Assignments that need your attention.</p></div></div>
    <section className="panel notification-list">
      {urgent.length?urgent.map(a=><article className="notification-item" key={a.id}><strong>{a.title}</strong><span>Due within 24 hours.</span></article>):<p className="muted">You have no urgent notifications.</p>}
    </section>
  </section>;
}
