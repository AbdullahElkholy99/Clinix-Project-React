import { useEffect, useState } from "react";
import { getPatientAppointments } from "./bookingService";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  Clock,
  Building2,
  Stethoscope,
  CheckCircle2,
  AlertCircle,
  ClipboardList,
  MapPin,
  Banknote,
  CalendarClock,
} from "lucide-react";

function RowSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-11 rounded-full bg-slate-100 dark:bg-slate-800 shrink-0" />
          <div>
            <Skeleton className="h-4 w-40 bg-slate-100 dark:bg-slate-800" />
            <Skeleton className="h-3 w-28 mt-2 bg-slate-100 dark:bg-slate-800" />
          </div>
        </div>
        <Skeleton className="h-6 w-20 rounded-full bg-slate-100 dark:bg-slate-800" />
      </div>
      <Skeleton className="h-4 w-full mt-4 bg-slate-100 dark:bg-slate-800" />
    </div>
  );
}

function MetaItem({ icon: Icon, label, value, accent = false }) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
      {label && <span className="text-xs text-slate-400 dark:text-slate-500">{label}</span>}
      <span
        className={`text-xs font-medium ${
          accent ? "text-teal-600 dark:text-teal-400" : "text-slate-600 dark:text-slate-300"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getPatientAppointments();

        const enrichedAppointments = (data || []).map((app) => {
          const savedName = localStorage.getItem(`clinicName_${app.appointmentAtClinicId}`);
          const savedLocation = localStorage.getItem(`clinicLocation_${app.appointmentAtClinicId}`);

          return {
            ...app,
            actualClinicName: savedName || "Elkholy Clinic",
            actualLocation: savedLocation || "dds, dsfsd",
          };
        });

        setAppointments(enrichedAppointments);
      } catch (error) {
        console.error("Failed to load appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const formatDay = (day) => (day ? day.charAt(0).toUpperCase() + day.slice(1) : "");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-medium">
            <CalendarClock className="h-3.5 w-3.5" />
            Your Schedule
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
            My Appointments
          </h1>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1.5">
            {loading
              ? "Fetching your appointments..."
              : `${appointments.length} appointment${appointments.length === 1 ? "" : "s"} on record`}
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <RowSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && appointments.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-24 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-slate-900/50">
            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-slate-300 dark:text-slate-600" />
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              No appointments found
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
              You haven't booked any clinic visits yet.
            </p>
          </div>
        )}

        {/* Appointments list */}
        {!loading && appointments.length > 0 && (
          <div className="space-y-4">
            {appointments.map((app, index) => {
              const confirmed = app.isAccepted;
              return (
                <div
                  key={app.bookingId || index}
                  className="rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 transition-all duration-200 hover:shadow-md hover:shadow-slate-200/40 dark:hover:shadow-none hover:border-slate-200 dark:hover:border-slate-700"
                >
                  {/* Top row: clinic + status */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="h-11 w-11 shrink-0 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-teal-500 dark:text-teal-400" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-slate-800 dark:text-white text-sm truncate">
                          {app.actualClinicName}
                        </h3>
                        {app.actualLocation && (
                          <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="truncate">{app.actualLocation}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        confirmed
                          ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {confirmed ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      {confirmed ? "Confirmed" : "Pending"}
                    </span>
                  </div>

                  {/* Bottom row: meta details */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/60">
                    <MetaItem icon={Stethoscope} label="" value={app.nameEN?.trim()} accent />
                    <MetaItem icon={Calendar} label="" value={formatDay(app.day)} />
                    <MetaItem
                      icon={Clock}
                      label=""
                      value={`${app.openAt?.substring(0, 5)} - ${app.closedAt?.substring(0, 5)}`}
                    />
                    <MetaItem icon={Banknote} label="" value={`${app.totalPrice} EGP`} accent />
                    <MetaItem
                      icon={ClipboardList}
                      label=""
                      value={app.medicalCondition || "General Checkup"}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAppointments;
