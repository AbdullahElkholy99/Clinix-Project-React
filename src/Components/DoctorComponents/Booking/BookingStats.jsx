import {
  CalendarCheck,
  Clock3,
  BadgeCheck,
} from "lucide-react";

export default function BookingStats({ bookings }) {
  const total = bookings.length;

  const pending = bookings.filter(
    (b) => b.isAccepted === false
  ).length;

  const confirmed = bookings.filter(
    (b) => b.isAccepted === true
  ).length;

 
  const stats = [
    {
      title: "Total",
      value: total,
      icon: CalendarCheck,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
      border: "border-blue-100",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock3,
      bg: "bg-yellow-50",
      iconColor: "text-yellow-600",
      border: "border-yellow-100",
    },
    {
      title: "Confirmed",
      value: confirmed,
      icon: BadgeCheck,
      bg: "bg-sky-50",
      iconColor: "text-sky-600",
      border: "border-sky-100",
    },
   
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`rounded-2xl border ${item.border} bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                  {item.value}
                </h2>
              </div>

              <div
                className={`rounded-2xl p-4 ${item.bg}`}
              >
                <Icon
                  className={item.iconColor}
                  size={28}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}