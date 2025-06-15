"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LikelihoodChart({ data }) {

  const grouped = data.reduce((acc, item) => {
    const key = item.country || "Other";
    if (!acc[key]) {
      acc[key] = { total: 0, count: 0 };
    }
    acc[key].total += item.likelihood || 0;
    acc[key].count += 1;
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([country, val]) => ({
    country,
    likelihood: val.count > 0 ? val.total / val.count : 0,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
        Avg. Likelihood by Country
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="likelihood" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
