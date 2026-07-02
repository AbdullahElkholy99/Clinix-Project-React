import {
  Bell,
  CalendarDays,
  Clock,
  CircleAlert,
  CheckCircle2,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: CalendarDays,
    title: "New Appointment",
    message: "Ahmed Mohamed booked an appointment for today.",
    time: "5 min ago",
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: 2,
    icon: Clock,
    title: "Upcoming Appointment",
    message: "Your next appointment starts in 30 minutes.",
    time: "15 min ago",
    color: "text-amber-600 bg-amber-100",
  },
  {
    id: 3,
    icon: CheckCircle2,
    title: "Appointment Completed",
    message: "Sara Ali's appointment has been completed.",
    time: "1 hour ago",
    color: "text-green-600 bg-green-100",
  },
  {
    id: 4,
    icon: CircleAlert,
    title: "Reminder",
    message: "Update your clinic working hours.",
    time: "Yesterday",
    color: "text-red-600 bg-red-100",
  },
];

export default function Notifications() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div className="flex items-center gap-2">
          <Bell className="text-blue-600" size={20} />
          <h2 className="text-lg font-semibold text-slate-800">
            Notifications
          </h2>
        </div>

        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Notifications */}
      <div className="max-h-[450px] overflow-y-auto">
        {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex items-start gap-4 border-b border-slate-100 px-6 py-4 transition hover:bg-slate-50 last:border-none"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full ${item.color}`}
              >
                <Icon size={20} />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {item.message}
                </p>

                <span className="mt-2 inline-block text-xs text-slate-400">
                  {item.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}