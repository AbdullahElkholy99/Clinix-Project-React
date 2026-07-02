import { Plus, CalendarDays } from "lucide-react";
import DashboardStats from "./DashboardStats";
import AppointmentTable from "./AppointmentTable";
import QuickActions from "./QuickActions";
import Notifications from "./Notifications";

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Welcome Back 👋
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-800">
              Doctor Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your clinics, appointments, patients and daily activities.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100">
              <CalendarDays size={18} />
              Today's Schedule
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700">
              <Plus size={18} />
              New Appointment
            </button>
          </div>
        </div>

        {/* Statistics */}
        <DashboardStats />

        {/* Main Content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Left Side */}
          <div className="space-y-6 lg:col-span-2">
            <AppointmentTable />
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <QuickActions />
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  );
}