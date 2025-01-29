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
                src="/placeholder.svg?height=40&width=40"
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