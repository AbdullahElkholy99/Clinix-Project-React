import { Search, X } from "lucide-react";

export default function BookingFilters({
  search,
  setSearch,
  status,
  setStatus,
  clinic,
  setClinic,
  clinics = [],
  onClear,
}) {
  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 text-slate-600"
          />
        </div>

        {/* Clinic */}
        <select
          value={clinic}
          onChange={(e) => setClinic(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 text-slate-600"
        >
          <option value="" className="text-slate-500">
            All Clinics
          </option>

          {clinics.map((c) => (
            <option key={c.id} value={c.clinicName} className="text-slate-600">
              {c.clinicName} - {c.city} - {c.area}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 text-slate-600"
        >
          <option value="">All Status</option>
          <option value={false}>Pending</option>
          <option value={true}>Confirmed</option>
        </select>

        {/* Clear */}
        <button
          onClick={onClear}
          className="flex items-center justify-center gap-2 rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50"
        >
          <X size={18} />
          Clear Filters
        </button>
      </div>

      {/* Quick Filters */}
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => setStatus("")}
          className={`rounded-full px-4 py-2 text-sm transition ${
            status === ""
              ? "bg-blue-600 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setStatus(false)}
          className={`rounded-full px-4 py-2 text-sm transition ${
            status === false
              ? "bg-yellow-500 text-white"
              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
          }`}
        >
          Pending
        </button>

        <button
          onClick={() => setStatus(true)}
          className={`rounded-full px-4 py-2 text-sm transition ${
            status === true
              ? "bg-sky-600 text-white"
              : "bg-sky-100 text-sky-700 hover:bg-sky-200"
          }`}
        >
          Confirmed
        </button>

      </div>
    </div>
  );
}
