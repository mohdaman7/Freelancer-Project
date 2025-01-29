import { Bell, Search, MessageSquare, ChevronDown } from "lucide-react"

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 fixed right-0 top-0 left-64 z-10 shadow-lg">
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Left side - Search */}
        <div className="flex items-center flex-1">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200 group">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-5 w-5 bg-blue-600 text-white text-xs font-semibold rounded-full flex items-center justify-center border-2 border-gray-800 group-hover:border-gray-700 transform -translate-y-1 translate-x-1 transition-all duration-200">
              3
            </span>
          </button>

          {/* Messages */}
          <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200 group">
            <MessageSquare className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-5 w-5 bg-blue-600 text-white text-xs font-semibold rounded-full flex items-center justify-center border-2 border-gray-800 group-hover:border-gray-700 transform -translate-y-1 translate-x-1 transition-all duration-200">
              5
            </span>
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-700"></div>

          {/* Admin Profile */}
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              <img
                src="data:image/jpeg;base64,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"
                alt="Admin"
                className="h-10 w-10 rounded-lg border-2 border-gray-700 group-hover:border-blue-500 transition-all duration-200"
              />
              <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
            </div>
            <div className="ml-3 hidden md:block">
              <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                Admin User
              </p>
              <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-200">
                admin@example.com
              </p>
            </div>
            <ChevronDown className="h-4 w-4 ml-2 text-gray-500 group-hover:text-gray-300 transition-colors duration-200" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header