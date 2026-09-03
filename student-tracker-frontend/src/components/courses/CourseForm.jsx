import { useEffect, useState } from "react";
import FormMessage from "../common/FormMessage";

export default function CourseForm({course,onSave,onCancel,isSaving}) {
  const [form,setForm] = useState({courseCode:"",courseName:"",instructor:"",credits:3,grade:"A"});
  const [errors,setErrors] = useState({});
  useEffect(() => setForm({
    courseCode:course?.courseCode || "", courseName:course?.courseName || "",
    instructor:course?.instructor || "", credits:course?.credits || 3, grade:course?.grade || "A"
  }), [course]);

  function change(e){ const {name,value}=e.target; setForm(c=>({...c,[name]:value})); setErrors(c=>({...c,[name]:""}));}
  function submit(e){
    e.preventDefault(); const next={};
    if(!form.courseCode.trim()) next.courseCode="Course code is required.";
    if(!form.courseName.trim()) next.courseName="Course name is required.";
    if(!Number(form.credits) || Number(form.credits)<1) next.credits="Credits must be at least 1.";
    setErrors(next); if(!Object.keys(next).length) onSave({...form,credits:Number(form.credits)});
  }
  return <form className="course-form" onSubmit={submit}>
    <div className="form-grid">
      <label><span>Course Code</span><input name="courseCode" value={form.courseCode} onChange={change}/><FormMessage>{errors.courseCode}</FormMessage></label>
      <label><span>Course Name</span><input name="courseName" value={form.courseName} onChange={change}/><FormMessage>{errors.courseName}</FormMessage></label>
      <label><span>Instructor</span><input name="instructor" value={form.instructor} onChange={change}/></label>
      <label><span>Credit Hours</span><input type="number" min="1" max="8" name="credits" value={form.credits} onChange={change}/><FormMessage>{errors.credits}</FormMessage></label>
      <label><span>Grade</span><select name="grade" value={form.grade} onChange={change}>{["A","A-","B+","B","B-","C+","C","C-","D+","D","F"].map(g=><option key={g}>{g}</option>)}</select></label>
    </div>
    <div className="form-actions"><button type="button" className="button secondary" onClick={onCancel}>Cancel</button><button type="submit" className="button primary" disabled={isSaving}>{isSaving?"Saving...":course?"Update Course":"Add Course"}</button></div>
  </form>;
}
