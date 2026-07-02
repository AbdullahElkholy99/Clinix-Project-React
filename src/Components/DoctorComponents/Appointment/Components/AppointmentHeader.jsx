import { CalendarPlus } from "lucide-react";

export default function AppointmentHeader() {
  return (
    <div className="mb-10">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

          <CalendarPlus
            className="text-blue-600"
            size={28}
          />

        </div>

        <div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create Appointment
          </h1>

          <p className="mt-1 text-slate-500">
            Choose one of your clinics to create an available appointment.
          </p>

        </div>

      </div>

    </div>
  );
}