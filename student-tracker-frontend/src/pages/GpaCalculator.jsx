import { useEffect, useMemo, useState } from "react";
import { Plus, RotateCcw, X } from "lucide-react";
import { courseApi } from "../services/api";
import { sampleCourses } from "../data/sampleData";
import { calculateGpa, gradePoints } from "../utils/gpa";

export default function GpaCalculator() {
  const [courses,setCourses]=useState([]);
  useEffect(()=>{courseApi.getAll().then(setCourses).catch(()=>setCourses(sampleCourses));},[]);
  const summary=useMemo(()=>calculateGpa(courses),[courses]);

  function update(id,field,value){setCourses(c=>c.map(x=>x.id===id?{...x,[field]:field==="credits"?Number(value):value}:x));}
  function add(){setCourses(c=>[...c,{id:`local-${Date.now()}`,courseCode:"",courseName:"New Course",credits:3,grade:"A"}]);}

  return <section className="page-section"><div className="gpa-layout">
    <section className="panel gpa-main">
      <div className="page-heading compact"><div><h1>GPA Calculator</h1><p>Your Courses</p></div></div>
      <div className="data-table">
        <div className="data-row table-header gpa-row"><span>Course</span><span>Credit Hours</span><span>Grade</span><span>Points</span><span/></div>
        {courses.map(c=>{const pts=(Number(c.credits)||0)*(gradePoints[c.grade]??0);return <div className="data-row gpa-row" key={c.id}>
          <input value={c.courseName} onChange={e=>update(c.id,"courseName",e.target.value)} aria-label="Course name"/>
          <input type="number" min="1" max="8" value={c.credits} onChange={e=>update(c.id,"credits",e.target.value)} aria-label="Credit hours"/>
          <select value={c.grade} onChange={e=>update(c.id,"grade",e.target.value)}>{Object.keys(gradePoints).map(g=><option key={g}>{g}</option>)}</select>
          <span>{pts.toFixed(1)}</span>
          <button className="table-icon-btn danger" onClick={()=>setCourses(x=>x.filter(y=>y.id!==c.id))} aria-label={`Remove ${c.courseName}`}><X size={16}/></button>
        </div>;})}
      </div>
      <div className="gpa-actions"><button className="button secondary" onClick={add}><Plus size={16}/>Add Course</button><button className="button secondary" onClick={()=>setCourses([])}><RotateCcw size={16}/>Reset</button></div>
    </section>
    <aside className="gpa-sidebar">
      <section className="panel summary-panel"><h2>GPA Summary</h2>
        <div className="summary-number"><span>Total Credit Hours</span><strong>{summary.totalCredits}</strong></div>
        <div className="summary-number"><span>Total Points</span><strong>{summary.totalPoints.toFixed(1)}</strong></div>
        <div className="summary-number"><span>Current GPA</span><strong>{summary.gpa.toFixed(2)}</strong></div>
      </section>
      <section className="panel grade-scale"><h2>Grade Scale</h2><div className="grade-grid">{Object.entries(gradePoints).map(([g,p])=><span key={g}>{g} = {p.toFixed(1)}</span>)}</div></section>
    </aside>
  </div></section>;
}
