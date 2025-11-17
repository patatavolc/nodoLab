import {
  CalendarDaysIcon,
  CreditCardIcon,
  UsersIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";

const QuickActions = () => {
  // Las acciones son fijas, son links o botones
  const actions = [
    {
      text: "Manage Bookings",
      icons: CalendarDaysIcon,
      onClick: () => console.log("Go to Bookings"),
    },
    {
      text: "Process Payments",
      icon: CreditCardIcon,
      onClick: () => console.log("Go to Payments"),
    },
    { text: "Member Directory", icon: UsersIcon, onClick: () => console.log("Go to Members") },
    {
      text: "Send Announcement",
      icon: MegaphoneIcon,
      onClick: () => console.log("Go to Announcement"),
    },
  ];

  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-xl h-full">
      <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg text-white hover:bg-gr-600 transition-colors h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <action.icon className="w-6 h-6 mb-2" />
            <span className="text-sm text-center">{action.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default QuickActions;
