import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import AssignmentList from "../components/assignments/AssignmentList";
import { assignmentApi } from "../services/api";
import { sampleAssignments } from "../data/sampleData";
import { getUrgencyLabel } from "../utils/date";

const filters = ["All","Due Soon","Overdue","Completed"];

export default function Assignments() {
  const [assignments,setAssignments]=useState([]);
  const [activeFilter,setActiveFilter]=useState("All");
  const [search,setSearch]=useState("");
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    assignmentApi.getAll().then(setAssignments).catch(() => {
      setAssignments(sampleAssignments);
      setMessage("Backend is not reachable. Showing sample assignments.");
    }).finally(() => setLoading(false));
  }, []);

  async function handleDelete(a) {
    const yes = window.confirm(`Delete "${a.title}"?`);
    if (!yes) return;
    if (String(a.id).startsWith("sample-")) {
      setAssignments(c => c.filter(x => x.id !== a.id)); return;
    }
    try {
      await assignmentApi.remove(a.id);
      setAssignments(c => c.filter(x => x.id !== a.id));
      setMessage("Assignment deleted successfully.");
    } catch(e) { setMessage(`Could not delete assignment: ${e.message}`); }
  }

  const filtered = useMemo(() => assignments.filter(a => {
    const urgency = getUrgencyLabel(a.dueDate,a.status);
    const matchesFilter = activeFilter === "All" || urgency === activeFilter;
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || a.title?.toLowerCase().includes(q) || a.course?.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  }), [assignments,activeFilter,search]);

  return <section className="page-section">
    <div className="page-heading">
      <h1>Assignments</h1>
      <Link className="button primary" to="/assignments/new"><Plus size={17}/>Add Assignment</Link>
    </div>

    <div className="toolbar">
      <div className="filter-group" aria-label="Assignment filters">
        {filters.map(f => <button key={f} type="button" className={activeFilter===f?"filter active":"filter"} onClick={()=>setActiveFilter(f)}>{f}</button>)}
      </div>
      <label className="search-label"><span className="sr-only">Search assignments</span><input type="search" placeholder="Search assignments..." value={search} onChange={e=>setSearch(e.target.value)}/></label>
    </div>

    {message && <p className="inline-message">{message}</p>}
    {loading ? <p className="loading-state">Loading assignments...</p> : <AssignmentList assignments={filtered} onDelete={handleDelete}/>}
    <div className="pagination"><button disabled>&lt;</button><button className="current">1</button><button>2</button><button>&gt;</button></div>
  </section>;
}
