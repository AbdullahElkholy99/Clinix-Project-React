import {
  CalendarDays,
  Clock3,
  FileText,
  CheckCircle2,
  XCircle,
  Eye,
  DollarSign,
  Stethoscope,
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
  onCancel,
  onView,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img
            src={
              // booking.filePath ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                booking.patientName,
              )}&background=2563eb&color=fff`
            }
            alt={booking.patientName}
            className="h-16 w-16 rounded-full border object-cover"
          />

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {booking.patientName}
            </h2>
           
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[booking.isAccepted ? "Confirmed" : "Pending"]
          }`}
        >
          {booking.isAccepted ? "Confirmed" : "Pending"}
        </span>
      </div>

      {/* Details */}
      <div className="mt-6 space-y-4 text-sm">
        <div className="flex items-center gap-3">
          <Stethoscope size={18} className="text-blue-600" />
          <span className="font-medium text-slate-700">
            <b>Specialization: </b> {booking.nameEN || booking.nameAR}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="text-blue-600" />
          <span className="text-slate-600">
           <b>Day: </b> {booking.day}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Clock3 size={18} className="text-blue-600" />
          <span className="text-slate-600">
           <b>Time: </b> {booking.openAt} - {booking.closedAt}
          </span>
        </div>

        <div className="flex items-start gap-3">
          <FileText size={18} className="mt-1 text-blue-600" />

          <div>
            <p className="font-medium text-slate-700">Medical Condition</p>

            <p className="text-slate-500">
              {booking.medicalCondition || "No medical condition provided"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DollarSign size={18} className="text-green-600" />

          <span className="font-semibold text-green-700">
            <b>Total Price: </b>{booking.totalPrice} EGP
          </span>
        </div>

       
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-2">
        {!booking.isAccepted && (
          <button
            onClick={() => onConfirm(booking.bookingId)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            <CheckCircle2 size={18} />
            Confirm
          </button>
        )}

        <button
          onClick={() => onCancel(booking.bookingId)}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
        >
          <XCircle size={18} />
          Cancel
        </button>

        <button
          onClick={() => onView(booking)}
          className="text-slate-600 ml-auto flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 transition hover:bg-slate-100"
        >
          <Eye size={18} />
          Details
        </button>
      </div>
    </div>
  );
}
