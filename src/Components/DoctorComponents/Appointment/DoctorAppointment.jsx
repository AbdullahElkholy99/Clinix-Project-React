import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  MapPin,
  Video,
  Clock,
  Calendar,
  User,
  Phone,
  FileText,
  AlertTriangle,
} from "lucide-react";

/* ---------------------------------------------------------------
   Data
--------------------------------------------------------------- */

const CLINICS = ["Downtown", "Northside", "Riverside"];
const STATUSES = ["Upcoming", "Completed", "Cancelled"];

const SEED_APPOINTMENTS = [
  {
    id: "a1",
    patient: "Marcus Kim",
    phone: "(555) 010-2231",
    clinic: "Downtown",
    date: "2026-07-02",
    time: "09:00",
    type: "in-person",
    status: "Upcoming",
    notes: "Annual check-up",
  },
  {
    id: "a2",
    patient: "Sofia Alvarez",
    phone: "(555) 010-7743",
    clinic: "Downtown",
    date: "2026-07-02",
    time: "10:30",
    type: "video",
    status: "Upcoming",
    notes: "Follow-up on medication",
  },
  {
    id: "a3",
    patient: "Grace Muthoni",
    phone: "(555) 010-9021",
    clinic: "Northside",
    date: "2026-07-02",
    time: "13:00",
    type: "in-person",
    status: "Cancelled",
    notes: "",
  },
  {
    id: "a4",
    patient: "Ben Okafor",
    phone: "(555) 010-4456",
    clinic: "Riverside",
    date: "2026-07-03",
    time: "08:30",
    type: "in-person",
    status: "Upcoming",
    notes: "New patient intake",
  },
  {
    id: "a5",
    patient: "Lena Park",
    phone: "(555) 010-3390",
    clinic: "Downtown",
    date: "2026-06-28",
    time: "11:00",
    type: "video",
    status: "Completed",
    notes: "",
  },
  {
    id: "a6",
    patient: "Theo Brandt",
    phone: "(555) 010-6612",
    clinic: "Northside",
    date: "2026-06-27",
    time: "15:30",
    type: "in-person",
    status: "Completed",
    notes: "Blood pressure recheck",
  },
];

const EMPTY_FORM = {
  patient: "",
  phone: "",
  clinic: CLINICS[0],
  date: "",
  time: "",
  type: "in-person",
  status: "Upcoming",
  notes: "",
};

/* ---------------------------------------------------------------
   Helpers
--------------------------------------------------------------- */

function toMinutes(hhmm) {
  if (!hhmm) return 0;
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function formatTime(hhmm) {
  if (!hhmm) return "—";
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

function formatDateHeader(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function statusStyles(status) {
  switch (status) {
    case "Upcoming":
      return "bg-[#EAF0EC] text-[#4F6E5A]";
    case "Completed":
      return "bg-[#EFEAE0] text-[#64748B]";
    case "Cancelled":
      return "bg-[#FBEAE3] text-[#B85F3B]";
    default:
      return "bg-[#EFEAE0] text-[#64748B]";
  }
}

function SectionLabel({ children, className = "" }) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B8377] ${className}`}
    >
      {children}
    </p>
  );
}

function Field({ icon: Icon, label, children }) {
  return (
    <label className="block">
      <span className="text-[12px] font-medium text-[#64748B] mb-1.5 flex items-center gap-1.5">
        {Icon && <Icon className="w-3.5 h-3.5" />} {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg borderborder-[#E2E8F0] bg-white px-3 py-2 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#16302B]/10 transition-shadow";

/* ---------------------------------------------------------------
   Main component
--------------------------------------------------------------- */

export default function DoctorManageAppointments() {
  const [appointments, setAppointments] = useState(SEED_APPOINTMENTS);
  const [clinicFilter, setClinicFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    return appointments
      .filter((a) => clinicFilter === "All" || a.clinic === clinicFilter)
      .filter((a) => statusFilter === "All" || a.status === statusFilter)
      .filter((a) =>
        search.trim() === ""
          ? true
          : a.patient.toLowerCase().includes(search.trim().toLowerCase()),
      );
  }, [appointments, clinicFilter, statusFilter, search]);

  const grouped = useMemo(() => {
    const byDate = {};
    for (const a of filtered) {
      byDate[a.date] = byDate[a.date] || [];
      byDate[a.date].push(a);
    }
    const dates = Object.keys(byDate).sort((a, b) => (a < b ? 1 : -1));
    return dates.map((date) => ({
      date,
      items: byDate[date].sort((x, y) => toMinutes(x.time) - toMinutes(y.time)),
    }));
  }, [filtered]);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(appt) {
    setEditingId(appt.id);
    setForm({ ...appt });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  function saveForm() {
    if (!form.patient.trim() || !form.phone.trim() || !form.date || !form.time)
      return;
    if (editingId) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === editingId ? { ...form, id: editingId } : a)),
      );
    } else {
      setAppointments((prev) => [...prev, { ...form, id: `a${Date.now()}` }]);
    }
    closeModal();
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setAppointments((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  const canSave =
    form.patient.trim() && form.phone.trim() && form.date && form.time;

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-[#0F172A]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      <div className="font-body">
        <main className="max-w-11/12 mx-auto px-6 py-10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h1
                className="font-display text-[32px]
               leading-[1.05] tracking-tight mb-1.5 text-blue-400"
              >
                Your appointments
              </h1>
              <p className="text-[#64748B]">
                {filtered.length} appointment{filtered.length === 1 ? "" : "s"}{" "}
                across {clinicFilter === "All" ? "all clinics" : clinicFilter}
              </p>
            </div>
            <button
              onClick={openCreate}
              className="flex items-center gap-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> New appointment
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8B8377] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patient..."
                className="pl-9 pr-3 py-2 rounded-lg borderborder-[#E2E8F0]
                 bg-white text-sm outline-none focus:border-[#2563EB] w-56"
              />
            </div>

            <div className="flex gap-1.5">
              {["All", ...CLINICS].map((c) => (
                <button
                  key={c}
                  onClick={() => setClinicFilter(c)}
                  className={`px-3 py-1.5 rounded-full text-[13px] font-medium border transition-colors ${
                    clinicFilter === c
                      ? "bg-[#2563EB] text-white border-[#2563EB]"
                      : "bg-transparent text-[#475569] border-[#E2E8F0] hover:border-[#2563EB]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex gap-1.5">
              {["All", ...STATUSES].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-full text-[13px] font-medium border transition-colors ${
                    statusFilter === s
                      ? "border-[#0EA5A4] text-[#0F766E] bg-[#ECFEFF]"
                      : "bg-transparent border-[#E2E8F0] text-[#475569] hover:border-[#0EA5A4]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Appointment groups */}
          {grouped.length === 0 ? (
            <div className="rounded-2xl border border-dashedborder-[#E2E8F0] py-16 text-center">
              <p className="font-display text-lg mb-1">No appointments here</p>
              <p className="text-[#8B8377] text-sm">
                Try a different clinic, status, or search.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {grouped.map(({ date, items }) => (
                <div key={date}>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <SectionLabel>{formatDateHeader(date)}</SectionLabel>
                  </div>

                  <div className="space-y-3">
                    {items.map((a) => (
                      <div
                        key={a.id}
                        className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-300"
                      >
                        {/* Left */}
                        <div className="flex items-center gap-5 min-w-0">
                          {/* Time */}
                          <div className="w-16 shrink-0 text-sm font-semibold text-blue-600">
                            {formatTime(a.time)}
                          </div>

                          {/* Patient */}
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {a.patient}
                            </p>

                            <p className="text-xs text-slate-500">{a.phone}</p>
                          </div>

                          {/* Clinic */}
                          <span className="hidden sm:inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                            {a.clinic}
                          </span>

                          {/* Type */}
                          <span className="hidden md:inline-flex items-center gap-1 text-xs text-slate-500">
                            {a.type === "video" ? (
                              <>
                                <Video className="w-4 h-4 text-cyan-600" />
                                Video
                              </>
                            ) : (
                              <>
                                <MapPin className="w-4 h-4 text-emerald-600" />
                                In-person
                              </>
                            )}
                          </span>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${statusStyles(
                              a.status,
                            )}`}
                          >
                            {a.status}
                          </span>

                          <button
                            onClick={() => openEdit(a)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                            aria-label="Edit appointment"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeleteTarget(a)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                            aria-label="Delete appointment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ---------------- Create / edit modal ---------------- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h2 className="font-display text-xl font-semibold text-slate-800">
                {editingId ? "Edit Appointment" : "New Appointment"}
              </h2>

              <button
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field icon={User} label="Patient Name">
                  <input
                    className={inputClass}
                    value={form.patient}
                    onChange={(e) =>
                      setForm({ ...form, patient: e.target.value })
                    }
                    placeholder="John Smith"
                  />
                </Field>

                <Field icon={Phone} label="Phone Number">
                  <input
                    className={inputClass}
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+20 100 000 0000"
                  />
                </Field>
              </div>

              <Field icon={MapPin} label="Clinic">
                <select
                  className={inputClass}
                  value={form.clinic}
                  onChange={(e) => setForm({ ...form, clinic: e.target.value })}
                >
                  {CLINICS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field icon={Calendar} label="Appointment Date">
                  <input
                    type="date"
                    className={inputClass}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </Field>

                <Field icon={Clock} label="Appointment Time">
                  <input
                    type="time"
                    className={inputClass}
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Visit Type">
                  <select
                    className={inputClass}
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="in-person">In-person</option>
                    <option value="video">Video Call</option>
                  </select>
                </Field>

                <Field label="Status">
                  <select
                    className={inputClass}
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field icon={FileText} label="Notes">
                <textarea
                  rows={4}
                  className={`${inputClass} resize-none`}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Additional information..."
                />
              </Field>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                onClick={closeModal}
                className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={saveForm}
                disabled={!canSave}
                className={`rounded-lg px-5 py-2 text-sm font-medium transition ${
                  canSave
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "cursor-not-allowed bg-slate-200 text-slate-400"
                }`}
              >
                {editingId ? "Save Changes" : "Create Appointment"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Delete Confirmation ---------------- */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="p-6">
              {/* Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>

              {/* Title */}
              <h2 className="font-display text-xl font-semibold text-slate-800">
                Delete Appointment?
              </h2>

              {/* Description */}
              <p className="mt-2 text-sm leading-6 text-slate-500">
                You're about to permanently delete{" "}
                <span className="font-semibold text-slate-700">
                  {deleteTarget.patient}
                </span>
                's appointment scheduled for{" "}
                <span className="font-medium text-slate-700">
                  {formatDateHeader(deleteTarget.date)}
                </span>{" "}
                at{" "}
                <span className="font-medium text-slate-700">
                  {formatTime(deleteTarget.time)}
                </span>
                .
                <br />
                <br />
                This action cannot be undone.
              </p>

              {/* Actions */}
              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  Delete Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
