import {
  CalendarDays,
  Clock,
  Phone,
  MapPin,
  Eye,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const appointments = [
  {
    id: 1,
    patient: "Ahmed Mohamed",
    phone: "+20 100 1111111",
    clinic: "Clinix Downtown",
    date: "Today",
    time: "09:30 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Sara Ali",
    phone: "+20 100 2222222",
    clinic: "Clinix Nasr City",
    date: "Today",
    time: "11:00 AM",
    status: "Pending",
  },
  {
    id: 3,
    patient: "John Smith",
    phone: "+20 100 3333333",
    clinic: "Clinix Downtown",
    date: "Today",
    time: "02:00 PM",
    status: "Completed",
  },
  {
    id: 4,
    patient: "Mohamed Adel",
    phone: "+20 100 4444444",
    clinic: "Clinix Giza",
    date: "Tomorrow",
    time: "10:00 AM",
    status: "Cancelled",
  },
];

const statusStyle = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Completed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function AppointmentTable() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Today's Appointments
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your upcoming patient visits
          </p>
        </div>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
          View All
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Patient
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Clinic
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Schedule
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {appointments.map((item) => (
              <tr
                key={item.id}
                className="transition hover:bg-slate-50"
              >
                <td className="px-6 py-5">
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {item.patient}
                    </h3>

                    <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <Phone size={14} />
                      {item.phone}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin size={16} className="text-blue-600" />
                    {item.clinic}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-700">
                      <CalendarDays size={15} />
                      {item.date}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock size={15} />
                      {item.time}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <button className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50">
                      <Eye size={18} />
                    </button>

                    <button className="rounded-lg p-2 text-green-600 transition hover:bg-green-50">
                      <CheckCircle2 size={18} />
                    </button>

                    <button className="rounded-lg p-2 text-red-600 transition hover:bg-red-50">
                      <XCircle size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 p-4 lg:hidden">
        {appointments.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">
                {item.patient}
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[item.status]}`}
              >
                {item.status}
              </span>
            </div>

            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Phone size={15} />
                {item.phone}
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={15} />
                {item.clinic}
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={15} />
                {item.date}
              </div>

              <div className="flex items-center gap-2">
                <Clock size={15} />
                {item.time}
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <Eye size={18} />
              </button>

              <button className="rounded-lg bg-green-50 p-2 text-green-600">
                <CheckCircle2 size={18} />
              </button>

              <button className="rounded-lg bg-red-50 p-2 text-red-600">
                <XCircle size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}