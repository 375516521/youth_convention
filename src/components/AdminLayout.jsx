import { Link } from "react-router-dom";
import "../admin.css";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-container">

      {/* Sidebar */}

      <div className="sidebar">
        <h2>Youth System</h2>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/youth">Youth List</Link>
        <Link to="/register">Register Youth</Link>

      </div>

      {/* Main Content */}

      <div className="main-content">

        <div className="topbar">
          <h3>Youth Convention Admin Panel</h3>
        </div>

        <div className="content">
          {children}
        </div>

      </div>

    </div>
  );
}