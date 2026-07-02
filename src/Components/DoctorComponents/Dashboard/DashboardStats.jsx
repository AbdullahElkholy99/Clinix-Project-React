import {
  CalendarDays,
  Users,
  Building2,
  DollarSign,
  Activity,
  Clock3,
  Star,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Today's Appointments",
    value: "18",
    change: "+12%",
    icon: CalendarDays,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Total Patients",
    value: "245",
    change: "+8%",
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "My Clinics",
    value: "3",
    change: "+1",
    icon: Building2,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    title: "Monthly Revenue",
    value: "$2,350",
    change: "+15%",
    icon: DollarSign,
    color: "bg-amber-100 text-amber-600",
  },
  {
    id: 5,
    title: "Pending Visits",
    value: "6",
    change: "-2",
    icon: Clock3,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    id: 6,
    title: "Completed Visits",
    value: "182",
    change: "+20%",
    icon: Activity,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 7,
    title: "Patient Rating",
    value: "4.9",
    change: "+0.2",
    icon: Star,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 8,
    title: "Growth",
    value: "24%",
    change: "+5%",
    icon: TrendingUp,
    color: "bg-pink-100 text-pink-600",
  },
];

export default function DashboardStats() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-800">
                  {stat.value}
                </h2>

                <span className="mt-3 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                  {stat.change}
                </span>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.color}`}
              >
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}