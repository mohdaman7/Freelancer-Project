import { useState } from "react";
import { Search, Filter, MoreVertical } from "lucide-react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Feedback = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const feedbackData = [
    {
      id: 1,
      subject: "Website Loading Issues",
      message: "Pages are taking too long to load on mobile devices",
      user: "John Smith",
      email: "john.smith@example.com",
      date: "2024-01-29",
      status: "New",
      type: "Bug Report",
    },
    {
      id: 2,
      subject: "Great Customer Service",
      message: "The support team was very helpful with my inquiry",
      user: "Mary Johnson",
      email: "mary.j@example.com",
      date: "2024-01-28",
      status: "Resolved",
      type: "Compliment",
    },
    {
      id: 3,
      subject: "Feature Request - Dark Mode",
      message: "Would love to see a dark mode option added",
      user: "David Wilson",
      email: "david.w@example.com",
      date: "2024-01-28",
      status: "In Progress",
      type: "Feature Request",
    },
  ];

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="p-6 bg-gray-50 min-h-screen mt-16">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Feedback Management
            </h1>
            <p className="text-gray-500">View and manage user feedback</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search feedback..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>
          </div>

          {/* Feedback Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {feedbackData.map((feedback) => (
                    <tr key={feedback.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-800">
                            {feedback.subject}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {feedback.message}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-800">
                            {feedback.user}
                          </div>
                          <div className="text-sm text-gray-500">
                            {feedback.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                          {feedback.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            feedback.status === "New"
                              ? "bg-blue-100 text-blue-800"
                              : feedback.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {feedback.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {feedback.date}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              Showing 1 to 3 of 3 results
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Previous
              </button>
              <button
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
