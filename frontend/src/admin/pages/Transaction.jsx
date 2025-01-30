import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  ArrowUpDown,
  Eye,
  RefreshCcw,
  CreditCard,
  Wallet,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

// Custom Card component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

// Custom Dialog component
const Dialog = ({ open, onOpenChange, children }) =>
  open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        {children}
        <button
          onClick={() => onOpenChange(false)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  ) : null;

const Transaction = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState("week");
  const [showRefundModal, setShowRefundModal] = useState(false);

  // Sample data
  const transactionData = [
    {
      id: 1,
      projectTitle: "E-commerce Website",
      client: "John Smith",
      developer: "Sarah Johnson",
      amount: 2500,
      status: "Completed",
      date: "2025-01-25",
      paymentMethod: "Credit Card",
      transactionId: "TXN123456",
      currency: "USD",
      description: "Final payment for e-commerce project",
      fee: 75,
      netAmount: 2425,
    },
    {
      id: 2,
      projectTitle: "Mobile App Development",
      client: "Tech Corp",
      developer: "Mike Wilson",
      amount: 3800,
      status: "Pending",
      date: "2025-01-27",
      paymentMethod: "Bank Transfer",
      transactionId: "TXN123457",
      currency: "USD",
      description: "Milestone 2 payment",
      fee: 114,
      netAmount: 3686,
    },
  ];

  const chartData = [
    { name: "Jan 22", amount: 4200 },
    { name: "Jan 23", amount: 3800 },
    { name: "Jan 24", amount: 5100 },
    { name: "Jan 25", amount: 2500 },
    { name: "Jan 26", amount: 4700 },
    { name: "Jan 27", amount: 3800 },
    { name: "Jan 28", amount: 4300 },
  ];

  const pieData = [
    { name: "Credit Card", value: 45 },
    { name: "Bank Transfer", value: 30 },
    { name: "PayPal", value: 25 },
  ];

  const COLORS = ["#818cf8", "#34d399", "#fbbf24"];

  const PaymentMethodDistribution = () => (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <RePieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );

  const TransactionDetails = ({ transaction }) => (
    <Dialog
      open={!!selectedTransaction}
      onOpenChange={() => setSelectedTransaction(null)}
    >
      <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-1">Transaction ID</h3>
            <p className="text-sm text-gray-500">
              {transaction?.transactionId}
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Date</h3>
            <p className="text-sm text-gray-500">{transaction?.date}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Amount</h3>
            <p className="text-sm text-gray-500">${transaction?.amount}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Status</h3>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                transaction?.status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : transaction?.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {transaction?.status}
            </span>
          </div>
          <div>
            <h3 className="font-medium mb-1">Payment Method</h3>
            <p className="text-sm text-gray-500">
              {transaction?.paymentMethod}
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Fee</h3>
            <p className="text-sm text-gray-500">${transaction?.fee}</p>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-1">Description</h3>
          <p className="text-sm text-gray-500">{transaction?.description}</p>
        </div>
        <div className="flex justify-end space-x-2">
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </button>
          {transaction?.status === "Completed" && (
            <button
              onClick={() => setShowRefundModal(true)}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Process Refund
            </button>
          )}
        </div>
      </div>
    </Dialog>
  );

  const FilterPanel = () => (
    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date Range</label>
          <select
            className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amount Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Payment Method
          </label>
          <select className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm">
            <option value="all">All Methods</option>
            <option value="card">Credit Card</option>
            <option value="bank">Bank Transfer</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div>
        <Header/>
      <div className="flex">
        <Sidebar/>
        <div className="p-6 space-y-6 w-6xl">
          
          <div className="flex justify-end space-x-4 mb-6 mt-16">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <CreditCard className="mr-2 h-4 w-4" />
              Process Payment
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              <Wallet className="mr-2 h-4 w-4" />
              Withdrawal
            </button>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <h3 className="text-sm font-medium mb-2">Total Transactions</h3>
              <div className="text-2xl font-bold">$84,245</div>
              <p className="text-xs text-gray-500">+20.1% from last month</p>
            </Card>

            <Card>
              <h3 className="text-sm font-medium mb-2">Pending Amount</h3>
              <div className="text-2xl font-bold">$12,380</div>
              <p className="text-xs text-gray-500">15 pending transactions</p>
            </Card>

            <Card>
              <h3 className="text-sm font-medium mb-2">Completed Today</h3>
              <div className="text-2xl font-bold">$3,845</div>
              <p className="text-xs text-gray-500">8 transactions</p>
            </Card>

            <Card>
              <h3 className="text-sm font-medium mb-2">Failed Transactions</h3>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-500">-2 from yesterday</p>
            </Card>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
            <Card>
              <h3 className="text-lg font-semibold mb-4">
                Transaction Overview
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#818cf8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            
            <Card>
              <h3 className="text-lg font-semibold mb-4">
                Payment Methods Distribution
              </h3>
              <PaymentMethodDistribution />
              <div className="flex justify-center space-x-4 mt-4">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">
                      {entry.name} ({entry.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

         
          <Card>
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-8 h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white shadow-sm hover:bg-gray-50 h-9 px-4 py-2"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white shadow-sm hover:bg-gray-50 h-9 px-4 py-2">
                <Download className="mr-2 h-4 w-4" />
                Export
              </button>
            </div>
            {showFilters && <FilterPanel />}
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b transition-colors hover:bg-gray-100"></tr>
                  <tr className="border-b transition-colors hover:bg-gray-100">
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="inline-flex items-center">
                          Date
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </button>
                      </div>
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Project
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Client
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Developer
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Amount
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Status
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactionData.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b transition-colors hover:bg-gray-100"
                    >
                      <td className="p-4">{transaction.date}</td>
                      <td className="p-4">{transaction.projectTitle}</td>
                      <td className="p-4">{transaction.client}</td>
                      <td className="p-4">{transaction.developer}</td>
                      <td className="p-4">${transaction.amount}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            transaction.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : transaction.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setSelectedTransaction(transaction)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-100 h-8 w-8"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing 1-10 of 50 transactions
              </div>
              <div className="flex space-x-2">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white shadow-sm hover:bg-gray-50 h-9 px-4 py-2">
                  Previous
                </button>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white shadow-sm hover:bg-gray-50 h-9 px-4 py-2">
                  Next
                </button>
              </div>
            </div>
          </Card>

          
          {selectedTransaction && (
            <TransactionDetails transaction={selectedTransaction} />
          )}

          
          <Dialog open={showRefundModal} onOpenChange={setShowRefundModal}>
            <h2 className="text-xl font-bold mb-4">Process Refund</h2>
            <div className="grid gap-4 py-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Refund Amount
                </label>
                <input
                  type="number"
                  max={selectedTransaction?.amount}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Enter refund amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Reason for Refund
                </label>
                <textarea
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  rows={3}
                  placeholder="Enter reason for refund"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Process Refund
                </button>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
