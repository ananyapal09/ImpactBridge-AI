import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function DonationAnalytics({ donations }) {
  const monthlyData = {};

  donations.forEach((donation) => {
    const month = new Date(
      donation.createdAt
    ).toLocaleString("default", {
      month: "short",
    });

    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }

    monthlyData[month] += donation.amount;
  });

  const chartData = Object.keys(monthlyData).map(
    (month) => ({
      month,
      amount: monthlyData[month],
    })
  );

  return (
    <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-8">

      <h2 className="hero-title text-4xl text-white mb-8">
        Monthly Donations
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={chartData}>

            <CartesianGrid stroke="#2D3A34" />

            <XAxis
              dataKey="month"
              stroke="#93A79A"
            />

            <YAxis stroke="#93A79A" />

            <Tooltip />

            <Bar
              dataKey="amount"
              fill="#E7B14C"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}