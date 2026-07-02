import {
  X,
  Stethoscope,
  CalendarDays,
  Clock3,
  ClipboardList,
  CheckCircle2,
  XCircle,
  DollarSign,
} from "lucide-react";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-sky-100 text-sky-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function BookingModal({
  open,
  booking,
  onClose,
  onConfirm,
  onCancel,
}) {
  if (!open || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Appointment Details
            </h2>

            <p className="text-sm text-slate-500">Appointment #{booking.id}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <X />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-8 p-6">
          {/* Patient */}
          <div className="flex items-center gap-5">
            <img
              src={
                // booking.filePath ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  booking.patientName,
                )}&background=2563eb&color=fff`
              }
              alt={booking.patientName}
              className="h-24 w-24 rounded-full border object-cover"
            />

            <div className="flex-1">
              <h3 className="text-xl font-bold">{booking.patientName}</h3>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  statusStyles[booking.isAccepted ? "Confirmed" : "Pending"]
                }`}
              >
                {booking.isAccepted ? "Confirmed" : "Pending"}
              </span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-2">

            <InfoCard
              icon={<Stethoscope size={18} />}
              title="Specialization"
              value={booking.nameEN + " - " + booking.nameAR}
            />

            <InfoCard
              icon={<CalendarDays size={18} />}
              title="Day"
              value={booking.day}
            />

            <InfoCard
              icon={<Clock3 size={18} />}
              title="Time Slot"
              value={booking.openAt + " - " + booking.closedAt}
            />

            <InfoCard
              icon={<DollarSign size={18} />}
              title="Total Price"
              value={booking.totalPrice}
            />
          </div>

          {/* Reason */}
          <Section icon={<ClipboardList size={18} />} title="Reason">
            {booking.medicalCondition || "No medical condition provided."}
          </Section>

 
        </div>

        {/* Footer */}
        <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 p-6">
          {booking.status === "Pending" && (
            <button
              onClick={() => {
                onConfirm(booking.id);
                onClose();
              }}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              <CheckCircle2 size={18} />
              Confirm
            </button>
          )}

          {booking.status === true && (
            <button
              onClick={() => {
                onConfirm(booking.id);
                onClose();
              }}
              className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
            >
              <CheckCircle2 size={18} />
              Complete
            </button>
          )}

          {booking.status !== true (
            <button
              onClick={() => {
                onCancel(booking.id);
                onClose();
              }}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
            >
              <XCircle size={18} />
              Cancel
            </button>
          )}

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="mb-2 flex items-center gap-2 text-blue-600">
        {icon}
        <span className="font-semibold">{title}</span>
      </div>

      <p className="text-slate-700">{value}</p>
    </div>
  );
}

function Section({ icon, title, children }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
        {icon}
        {title}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-600">
        {children}
      </div>
    </div>
  );
}
