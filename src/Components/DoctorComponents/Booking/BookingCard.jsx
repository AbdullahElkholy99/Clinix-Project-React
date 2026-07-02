import {
  CalendarDays,
  Clock3,
  Phone,
  Building2,
  FileText,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-sky-100 text-sky-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function BookingCard({
  booking,
  onConfirm,
  onComplete,
  onCancel,
  onView,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img
            src={booking.patientImage}
            alt={booking.patientName}
            className="h-16 w-16 rounded-full border object-cover"
          />

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {booking.patientName}
            </h2>

            <p className="text-sm text-slate-500">
              {booking.age} Years • {booking.gender}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[booking.status]
          }`}
        >
          {booking.status}
        </span>
      </div>

      {/* Details */}
      <div className="mt-6 space-y-3 text-sm">
        <div className="flex items-center gap-3">
          <Building2 size={18} className="text-blue-600" />
          <span className="text-black">{booking.clinicName}</span>
        </div>

        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="text-blue-600" />
          <span className="text-black">{booking.date}</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock3 size={18} className="text-blue-600" />
          <span className="text-black">{booking.time}</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={18} className="text-blue-600" />
          <span className="text-black">{booking.phone}</span>
        </div>

        <div className="flex items-start gap-3">
          <FileText
            size={18}
            className="mt-0.5 text-blue-600"
          />

          <div>
            <p className="font-medium text-slate-700">
              {booking.reason}
            </p>

            <p className="text-slate-500">
              {booking.symptoms}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-2">
        {booking.status === "Pending" && (
          <button
            onClick={() => onConfirm(booking.id)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            <CheckCircle2 size={18} />
            Confirm
          </button>
        )}

        {booking.status === "Confirmed" && (
          <button
            onClick={() => onComplete(booking.id)}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            <CheckCircle2 size={18} />
            Complete
          </button>
        )}

        {booking.status !== "Cancelled" &&
          booking.status !== "Completed" && (
            <button
              onClick={() => onCancel(booking.id)}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
            >
              <XCircle size={18} />
              Cancel
            </button>
          )}

        <button
          onClick={() => onView(booking)}
          className="ml-auto flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 transition hover:bg-slate-100"
        >
          <Eye size={18} />
          Details
        </button>
      </div>
    </div>
  );
}