import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import AssignmentForm from "../components/assignments/AssignmentForm";
import { assignmentApi, courseApi } from "../services/api";
import { sampleCourses } from "../data/sampleData";

export default function AssignmentFormPage() {
  const {id}=useParams(); const location=useLocation(); const navigate=useNavigate();
  const [courses,setCourses]=useState([]); const [isSaving,setIsSaving]=useState(false); const [error,setError]=useState("");
  useEffect(()=>{courseApi.getAll().then(setCourses).catch(()=>setCourses(sampleCourses));},[]);

  async function save(form) {
    setIsSaving(true); setError("");
    const payload={title:form.title,description:form.description,dueDate:form.dueDate,status:form.status};
    try {
      id ? await assignmentApi.update(id,payload) : await assignmentApi.create(payload);
      navigate("/assignments");
    } catch(e) { setError(`Could not save assignment: ${e.message}`); }
    finally { setIsSaving(false); }
  }

  return <section className="page-section narrow-form-page">
    <div className="form-page-title"><Link className="back-link" to="/assignments"><ArrowLeft size={18}/></Link><h1>{id?"Edit Assignment":"Add Assignment"}</h1></div>
    {error && <p className="form-message error">{error}</p>}
    <AssignmentForm initialValues={location.state?.assignment} courses={courses} onSubmit={save} onCancel={()=>navigate("/assignments")} isSaving={isSaving}/>
  </section>;
}
