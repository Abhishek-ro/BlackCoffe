"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function InsightsChart({ data }) {
 
  const grouped = data.reduce((acc, item) => {
    const key = item.sector || "Other";
    acc[key] = (acc[key] || 0) + (item.intensity || 0);
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([key, value]) => ({
    sector: key,
    intensity: value,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
        Intensity by Sector
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="sector" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="intensity" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
