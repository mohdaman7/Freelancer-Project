import { useState } from 'react';
import { 
  Search, 
  Filter, 
  UserPlus,  
  Edit2, 
  Trash2, 
  Ban,
  CheckCircle,
  XCircle 
} from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const UserManagement = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample user data
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "Developer",
      status: "Active",
      joinDate: "2024-01-15",
      projects: 12,
      rating: 4.8
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@example.com",
      role: "Client",
      status: "Active",
      joinDate: "2024-01-10",
      projects: 5,
      rating: 4.5
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.w@example.com",
      role: "Developer",
      status: "Inactive",
      joinDate: "2023-12-20",
      projects: 8,
      rating: 4.2
    },
    // Add more sample users as needed
  ];

  return (
    <div className='flex'>
        <Sidebar/>
    <div className="flex-1 p-6 bg-gray-50">
        <Header/>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <UserPlus className="w-5 h-5" />
          Add New User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <div className="flex items-center mt-2">
            <span className="text-2xl font-bold text-gray-800">2,451</span>
            <span className="text-green-500 text-sm ml-2">+12%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm">Active Users</h3>
          <div className="flex items-center mt-2">
            <span className="text-2xl font-bold text-gray-800">1,935</span>
            <span className="text-green-500 text-sm ml-2">+5%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm">New Users (This Month)</h3>
          <div className="flex items-center mt-2">
            <span className="text-2xl font-bold text-gray-800">245</span>
            <span className="text-red-500 text-sm ml-2">-2%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm">Blocked Users</h3>
          <div className="flex items-center mt-2">
            <span className="text-2xl font-bold text-gray-800">23</span>
            <span className="text-green-500 text-sm ml-2">-8%</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Tabs */}
          <div className="flex space-x-4">
            <button 
              onClick={() => setSelectedTab('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedTab === 'all' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All Users
            </button>
            <button 
              onClick={() => setSelectedTab('developers')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedTab === 'developers' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Developers
            </button>
            <button 
              onClick={() => setSelectedTab('clients')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedTab === 'clients' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Clients
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src="/api/placeholder/40/40"
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === 'Developer' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`flex items-center ${
                    user.status === 'Active' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {user.status === 'Active' ? (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-1" />
                    )}
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.joinDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.projects}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900">{user.rating}</span>
                    <div className="ml-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`w-2 h-2 rounded-full mx-0.5 ${
                            i < Math.floor(user.rating) 
                              ? 'bg-yellow-400' 
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Ban className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to 10 of 97 results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-blue-50 text-blue-600">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserManagement;