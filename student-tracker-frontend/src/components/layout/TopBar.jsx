import { Bell, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
export default function TopBar() {
  return (
    <header className="topbar">
      <div />
      <div className="topbar-actions">
        <Link className="icon-button" to="/notifications" aria-label="Open notifications"><Bell size={20}/></Link>
        <button className="icon-button" type="button" aria-label="User profile"><UserRound size={21}/></button>
      </div>
    </header>
  );
}
