import { useEffect, useState } from "react";
import { getAnalytics } from "../services/adminService";
import AIInsights from "../components/admin/AIInsights";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#22c55e", "#E7B14C", "#ef4444", "#3b82f6", "#8b5cf6"];

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await getAnalytics(token);

      setAnalytics(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!analytics) {
    return (
      <div className="min-h-screen bg-[#14201B] flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  const monthlyData = Object.entries(analytics.monthly).map(
    ([month, amount]) => ({
      month,
      amount,
    })
  );

  const categoryData = Object.entries(analytics.categories).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const fraudData = [
    {
      name: "Safe",
      value: analytics.fraud.safe,
    },
    {
      name: "Medium",
      value: analytics.fraud.medium,
    },
    {
      name: "High",
      value: analytics.fraud.high,
    },
  ];

  return (
    <div className="min-h-screen bg-[#14201B] text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Analytics Dashboard
      </h1>

      {/* Top Cards */}

      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-[#1B2A24] rounded-xl p-6">
          <p className="text-gray-400">Total Donations</p>

          <h2 className="text-4xl font-bold text-[#22c55e]">
            ₹{analytics.totals.totalDonations}
          </h2>
        </div>

        <div className="bg-[#1B2A24] rounded-xl p-6">
          <p className="text-gray-400">Users</p>

          <h2 className="text-4xl font-bold">
            {analytics.totals.totalUsers}
          </h2>
        </div>

        <div className="bg-[#1B2A24] rounded-xl p-6">
          <p className="text-gray-400">NGOs</p>

          <h2 className="text-4xl font-bold">
            {analytics.totals.totalNGOs}
          </h2>
        </div>

        <div className="bg-[#1B2A24] rounded-xl p-6">
          <p className="text-gray-400">Campaigns</p>

          <h2 className="text-4xl font-bold">
            {analytics.totals.totalCampaigns}
          </h2>
        </div>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-2 gap-8">
        <div className="mt-8">
    <AIInsights analytics={analytics} />
</div>

        {/* Monthly Donations */}

        <div className="bg-[#1B2A24] rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Monthly Donations
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Bar
                dataKey="amount"
                fill="#E7B14C"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* Categories */}

        <div className="bg-[#1B2A24] rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Campaign Categories
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Fraud Distribution */}

      <div className="bg-[#1B2A24] rounded-xl p-6 mt-10">

        <h2 className="text-2xl font-bold mb-6">
          Fraud Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie
              data={fraudData}
              dataKey="value"
              outerRadius={120}
              label
            >

              <Cell fill="#22c55e" />
              <Cell fill="#E7B14C" />
              <Cell fill="#ef4444" />

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}