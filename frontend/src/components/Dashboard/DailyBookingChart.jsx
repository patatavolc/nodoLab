import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

// data es un objeto: { charData: [/*...*/], summary: { total, changePercent, isPositive }}
const DailyBookingsChart = ({ data }) => {
  const { charData, summary } = data;
  const { total, changePercent, isPositive } = summary;

  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-xl h-96 flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-white">Daily Bookings</h2>
          <p className="text-3xl font-bold text-white">
            {total}
            {/* El porcentaje de cambio viene directamente del backend */}
            <span
              className={`text-base font-medium ml-2 ${
                isPositive ? "txt-green-400" : "text-red-400"
              }`}
            >
              {changePercent}
            </span>
          </p>
        </div>
        <p className="text-sm text-gray-400 mt-2">Last 7 Days</p>
      </div>

      <div className="grow mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={charData} margin={{ top: 10, right: 0, left: 0, botton: 0 }}>
            <XAxis dataKey="name" stroke="#4B5563" className="text-xs" />
            <Tooltip
              cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
              contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "4px" }}
              labelStyle={{ color: "#e5e7eb" }}
              itemStyle={{ color: "#e5e7eb" }}
            />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyBookingsChart;
