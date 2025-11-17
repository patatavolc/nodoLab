import { CreditCardIcon, CalendarIcon, UserIcon, ClockIcon } from "@heroicons/react/24/outline";

// Mapeo de tipos de actividad (deben de ser consistentes con el backend) a iconos
const iconMap = {
  paymentReceived: CreditCardIcon,
  newBooking: CalendarIcon,
  newMember: UserIcon,
  overdue: ClockIcon,
};

const colorMap = {
  paymentReceived: "text-green-400",
  newBooking: "text-blue-400",
  newMember: "text-orange-400",
  overdue: "text-red-400",
};

// activityData es un array de objetos con { type, description, time, amount }
const RecentActivity = ({ activityData }) => {
  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-xl h-full">
      <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>

      {activityData.map((activity, index) => {
        // Obtener icono y color basado en 'type'
        const Icon = iconMap[activity.type] || ClockIcon;
        const color = colorMap[activity.type] || "text-gray-400";

        return (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0"
          >
            <div className="flex items-center">
              <Icon className={`w-5 h-5 mr-3 ${color}`} />
              <div>
                {/* description y time */}
                <p className="text-sm text-white">{activity.description}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
            {/* amount solo se muestra si existe los datos */}
            {activity.amount && (
              <span className="text-sm font-medium text-green-400">{activity.amount}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default RecentActivity;
