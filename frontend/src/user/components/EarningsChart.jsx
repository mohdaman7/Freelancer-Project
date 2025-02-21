import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const EarningsChart = ({ earningsHistory }) => {
  return (
    <div className="h-96">
      <h2 className="text-2xl font-semibold mb-4">Earnings History</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={earningsHistory}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none" }} labelStyle={{ color: "#D1D5DB" }} />
          <Bar dataKey="amount" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default EarningsChart

