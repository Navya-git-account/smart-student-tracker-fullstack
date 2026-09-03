import { useMemo, useState } from "react";
import FormMessage from "../common/FormMessage";

function todayString() {
  const now = new Date(), offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().split("T")[0];
}

export default function AssignmentForm({initialValues,courses,onSubmit,onCancel,isSaving}) {
  const [form,setForm] = useState({
    title:initialValues?.title || "", course:initialValues?.course || "",
    dueDate:initialValues?.dueDate || "", dueTime:initialValues?.dueTime || "",
    description:initialValues?.description || "", status:initialValues?.status || "PENDING"
  });
  const [errors,setErrors] = useState({});
  const today = useMemo(todayString, []);

  function handleChange(e) {
    const {name,value} = e.target;
    setForm(c => ({...c,[name]:value}));
    setErrors(c => ({...c,[name]:""}));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const next = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.dueDate) next.dueDate = "Due date is required.";
    if (form.dueDate && form.dueDate < today) next.dueDate = "Due date cannot be in the past.";
    if (!form.description.trim()) next.description = "Description is required.";
    setErrors(next);
    if (!Object.keys(next).length) onSubmit(form);
  }

  return <form className="assignment-form" onSubmit={handleSubmit} noValidate>
    <label><span>Title</span><input name="title" value={form.title} onChange={handleChange} placeholder="Enter assignment title"/><FormMessage>{errors.title}</FormMessage></label>
    <label><span>Course</span><select name="course" value={form.course} onChange={handleChange}>
      <option value="">Select course</option>
      {courses.map(c => <option key={c.id} value={c.courseName}>{c.courseCode} · {c.courseName}</option>)}
    </select></label>
    <label><span>Due Date</span><input type="date" name="dueDate" min={today} value={form.dueDate} onChange={handleChange}/><FormMessage>{errors.dueDate}</FormMessage></label>
    <label><span>Due Time</span><input type="time" name="dueTime" value={form.dueTime} onChange={handleChange}/></label>
    <label><span>Description</span><textarea name="description" rows="4" value={form.description} onChange={handleChange} placeholder="Enter assignment description"/><FormMessage>{errors.description}</FormMessage></label>
    <label><span>Status</span><select name="status" value={form.status} onChange={handleChange}><option value="PENDING">Upcoming</option><option value="COMPLETED">Completed</option></select></label>
    <div className="form-actions"><button type="button" className="button secondary" onClick={onCancel}>Cancel</button><button type="submit" className="button primary" disabled={isSaving}>{isSaving ? "Saving..." : "Save"}</button></div>
  </form>;
}
