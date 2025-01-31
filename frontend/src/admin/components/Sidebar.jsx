
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CreditCard, 
  MessageSquare, 
  BarChart2, 
  Settings,
  LogOut
} from 'lucide-react';


const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/admin/dashboard", name: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/users", name: "User Management", icon: Users },
    { path: "/admin/jobs", name: "Jobs & Services", icon: Briefcase },
    { path: "/admin/transactions", name: "Transactions", icon: CreditCard },
    { path: "/admin/feedback", name: "Feedback Center", icon: MessageSquare },
    { path: "/admin/analytics", name: "Analytics", icon: BarChart2 },
    { path: "/admin/settings", name: "Settings", icon: Settings }
  ];

  return (
    <aside className="sidebar bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 w-64 h-screen flex flex-col">
      {/* Logo Section */}
      <div className="logo p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white tracking-wider">LOGO</h1>
      </div>

      {/* Menu Section */}
      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                ${isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-gray-700 hover:text-white'
                }`}
            >
              <item.icon className={`h-5 w-5 ${
                isActive 
                  ? 'text-white' 
                  : 'text-gray-400 group-hover:text-white'
              }`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-700">
        <button 
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200"
          onClick={() => {/* Add logout handler */}}
        >
          <LogOut className="h-5 w-5" onClick={()=>navigate('/')}/>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;