import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="page-shell">
        <TopBar />
        <main className="page-content"><Outlet /></main>
        <footer className="app-footer">Smart Student Tracker · Stay organized and on track</footer>
      </div>
    </div>
  );
}
