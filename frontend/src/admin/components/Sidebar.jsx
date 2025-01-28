
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar bg-gray-800 text-white w-64 h-screen">
      <div className="logo p-4 text-2xl font-bold">LOGO</div>
      <ul className="menu p-4 space-y-2">
        <li><Link to="/admin/dashboard" className="block p-2 hover:bg-gray-700">Dashboard</Link></li>
        <li><Link to="/admin/users" className="block p-2 hover:bg-gray-700">User Management</Link></li>
        <li><Link to="/admin/jobs" className="block p-2 hover:bg-gray-700">Jobs & Services</Link></li>
        <li><Link to="/admin/transactions" className="block p-2 hover:bg-gray-700">Transactions</Link></li>
        <li><Link to="/admin/feedback" className="block p-2 hover:bg-gray-700">Feedback Center</Link></li>
        <li><Link to="/admin/analytics" className="block p-2 hover:bg-gray-700">Analytics</Link></li>
        <li><Link to="/admin/settings" className="block p-2 hover:bg-gray-700">Settings</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
