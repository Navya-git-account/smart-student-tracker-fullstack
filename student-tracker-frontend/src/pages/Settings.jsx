import { useState } from "react";
export default function Settings() {
  const [notifications,setNotifications]=useState(true);
  const [compact,setCompact]=useState(false);
  return <section className="page-section">
    <div className="page-heading"><div><h1>Settings</h1><p>Choose how Student Tracker behaves.</p></div></div>
    <section className="panel settings-panel">
      <label className="setting-row"><span><strong>Assignment notifications</strong><small>Show reminders for assignments due soon.</small></span><input type="checkbox" checked={notifications} onChange={e=>setNotifications(e.target.checked)}/></label>
      <label className="setting-row"><span><strong>Compact view</strong><small>Use a denser layout for lists.</small></span><input type="checkbox" checked={compact} onChange={e=>setCompact(e.target.checked)}/></label>
    </section>
  </section>;
}
