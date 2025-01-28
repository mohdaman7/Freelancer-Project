import { Bell, Search, MessageSquare } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-200 fixed right-0 top-0 left-64 z-10">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left side - Search */}
        <div className="flex items-center flex-1">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Messages */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <MessageSquare className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-5 w-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
              5
            </span>
          </button>

          {/* Admin Profile */}
          <div className="flex items-center">
            <img
              src="/api/placeholder/32/32"
              alt="Admin"
              className="h-8 w-8 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;