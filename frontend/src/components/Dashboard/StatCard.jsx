import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

const StatCard = ({ title, value, change, isPositive }) => {
  const changeColor = isPositive ? "text-green-400" : "text-red-400";
  const Icon = isPositive ? ArrowUpIcon : ArrowDownIcon;

  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-xl">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <div className="mt-1 flex justify-between items-end">
        <p className="text-3xl font-semibold text-white">{value}</p>
        <div className="flex items-center text-sm font-medium">
          <Icon className={`w-4 h-4 mr-1 ${changeColor}`} />
          <span className={changeColor}>{change}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
