import React from 'react';
import './admin.css';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';


const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <header className="header">
        <h1>Admin Dashboard</h1>
      </header>
      <div className="main-content">
        <nav className="sidebar">
          <ul>
            
            <li><Link to={"question"}>Questions</Link></li>
            <li><a href="/admin/users">Users</a></li>

          </ul>
        </nav>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
