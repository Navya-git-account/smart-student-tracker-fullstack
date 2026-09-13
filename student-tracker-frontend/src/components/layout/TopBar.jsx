import { useState } from "react";
import { Bell, LogOut, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../services/api";

export default function TopBar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApi.logout();

      setShowUserMenu(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="topbar">
      <div />

      <div className="topbar-actions">
        <Link
          className="icon-button"
          to="/notifications"
          aria-label="Open notifications"
        >
          <Bell size={20} />
        </Link>

        <div className="user-menu">
          <button
            className="icon-button"
            type="button"
            aria-label="User profile"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <UserRound size={21} />
          </button>

          {showUserMenu && (
            <div className="user-dropdown">
              <button
                type="button"
                onClick={handleLogout}
              >
                <LogOut size={17} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}