import { NavLink } from "react-router-dom";
import { Bell, BookOpen, CalendarDays, Calculator, ClipboardList, ContactRound, LayoutDashboard, Settings } from "lucide-react";

const links = [
  {to:"/",label:"Dashboard",icon:LayoutDashboard,end:true},
  {to:"/assignments",label:"Assignments",icon:ClipboardList},
  {to:"/courses",label:"Courses",icon:BookOpen},
  {to:"/gpa",label:"GPA Calculator",icon:Calculator},
  {to:"/contact",label:"Contact",icon:ContactRound},
  {to:"/calendar",label:"Calendar",icon:CalendarDays},
  {to:"/notifications",label:"Notifications",icon:Bell},
  {to:"/settings",label:"Settings",icon:Settings}
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand" aria-label="Student Tracker"><span>Student</span><span>Tracker</span></div>
      <nav className="side-nav" aria-label="Primary navigation">
        {links.map(({to,label,icon:Icon,end}) => (
          <NavLink key={to} to={to} end={end}
            className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>
            <Icon size={18} aria-hidden="true" /><span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
