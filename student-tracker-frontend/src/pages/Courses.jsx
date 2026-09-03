import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import CourseForm from "../components/courses/CourseForm";
import CourseList from "../components/courses/CourseList";
import { courseApi } from "../services/api";
import { sampleCourses } from "../data/sampleData";

export default function Courses() {
  const [courses,setCourses]=useState([]); const [search,setSearch]=useState("");
  const [showForm,setShowForm]=useState(false); const [editing,setEditing]=useState(null);
  const [message,setMessage]=useState(""); const [saving,setSaving]=useState(false);

  useEffect(()=>{courseApi.getAll().then(setCourses).catch(()=>{setCourses(sampleCourses);setMessage("Backend is not reachable. Showing sample courses.");});},[]);

  const filtered=useMemo(()=>{
    const q=search.trim().toLowerCase(); if(!q) return courses;
    return courses.filter(c=>c.courseCode?.toLowerCase().includes(q)||c.courseName?.toLowerCase().includes(q)||c.instructor?.toLowerCase().includes(q));
  },[courses,search]);

  async function save(form) {
    setSaving(true); setMessage("");
    const payload={courseCode:form.courseCode,courseName:form.courseName,credits:form.credits,grade:form.grade};
    try {
      if(editing && !String(editing.id).startsWith("sample-")) {
        const saved=await courseApi.update(editing.id,payload);
        setCourses(c=>c.map(x=>x.id===editing.id?{...saved,instructor:form.instructor}:x));
      } else if(editing) {
        setCourses(c=>c.map(x=>x.id===editing.id?{...x,...form}:x));
      } else {
        const saved=await courseApi.create(payload);
        setCourses(c=>[...c,{...saved,instructor:form.instructor}]);
      }
      setShowForm(false); setEditing(null); setMessage("Course saved successfully.");
    } catch(e){setMessage(`Could not save course: ${e.message}`);}
    finally{setSaving(false);}
  }

  async function remove(course) {
    if(!window.confirm(`Delete "${course.courseName}"?`)) return;
    if(String(course.id).startsWith("sample-")) {setCourses(c=>c.filter(x=>x.id!==course.id));return;}
    try{await courseApi.remove(course.id);setCourses(c=>c.filter(x=>x.id!==course.id));setMessage("Course deleted successfully.");}
    catch(e){setMessage(`Could not delete course: ${e.message}`);}
  }

  return <section className="page-section">
    <div className="page-heading"><h1>Courses</h1><button className="button primary" onClick={()=>{setEditing(null);setShowForm(true);}}><Plus size={17}/>Add Course</button></div>
    <div className="toolbar courses-toolbar"><div/><label className="search-label"><span className="sr-only">Search courses</span><input type="search" placeholder="Search courses..." value={search} onChange={e=>setSearch(e.target.value)}/></label></div>
    {message&&<p className="inline-message">{message}</p>}
    {showForm&&<section className="panel form-panel"><h2>{editing?"Edit Course":"Add Course"}</h2><CourseForm course={editing} onSave={save} onCancel={()=>{setShowForm(false);setEditing(null);}} isSaving={saving}/></section>}
    <CourseList courses={filtered} onEdit={c=>{setEditing(c);setShowForm(true);}} onDelete={remove}/>
    <div className="pagination"><button disabled>&lt;</button><button className="current">1</button><button>&gt;</button></div>
  </section>;
}
