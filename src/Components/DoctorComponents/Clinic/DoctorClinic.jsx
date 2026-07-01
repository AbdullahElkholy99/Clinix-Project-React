import { useState } from "react";
import { Plus, Search, Building2, CalendarDays } from "lucide-react";
import ClinicModal from "./ClinicModel";
const emptyClinic = {
  name: "",
  address: "",
  phone: "",
  status: "Open",
};

export default function DoctorClinic() {
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [clinics, setClinics] = useState([
    {
      id: 1,
      name: "Clinix Downtown",
      address: "Cairo",
      phone: "+20 100 1111111",
      appointments: 15,
      status: "Open",
    },
    {
      id: 2,
      name: "Clinix Nasr City",
      address: "Nasr City",
      phone: "+20 100 2222222",
      appointments: 9,
      status: "Closed",
    },
  ]);
  const [clinic, setClinic] = useState(emptyClinic);

  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const saveClinic = () => {
    if (editing) {
      setClinics((prev) =>
        prev.map((c) =>
          c.id === editingId ? { ...clinic, id: editingId } : c,
        ),
      );
    } else {
      setClinics((prev) => [
        ...prev,
        {
          ...clinic,
          id: Date.now(),
          appointments: 0,
        },
      ]);
    }

    setClinic(emptyClinic);
    setEditing(false);
    setEditingId(null);
    setOpenModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">My Clinics</h1>

            <p className="mt-1 text-slate-500">
              Manage your clinics and appointments
            </p>
          </div>
          <button
            onClick={() => {
              setClinic(emptyClinic);
              setEditing(false);
              setOpenModal(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            New Clinic
          </button>
        </div>

        {/* Toolbar */}

        <div className="mb-8 flex items-center justify-between">
          <div className="relative w-80">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={18}
            />

            <input
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none focus:border-blue-500"
              placeholder="Search clinic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Clinics */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {clinics.map((clinic) => (
            <div
              key={clinic.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-3">
                    <Building2 className="text-blue-600" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-800">
                      {clinic.name}
                    </h2>

                    <p className="text-sm text-slate-500">{clinic.address}</p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    clinic.status === "Open"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {clinic.status}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone</span>

                  <span>{clinic.phone}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Today's Appointments</span>

                  <span className="font-semibold text-blue-600">
                    {clinic.appointments}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button className="flex-1 rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
                  <CalendarDays className="mx-auto" size={18} />
                </button>

                <button
                  onClick={() => {
                    setClinic(clinic);
                    setEditing(true);
                    setEditingId(clinic.id);
                    setOpenModal(true);
                  }}
                  className="flex-1 rounded-lg border border-slate-200 py-2 hover:bg-slate-50"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    setClinics((prev) => prev.filter((c) => c.id !== clinic.id))
                  }
                  className="flex-1 rounded-lg border border-red-200 py-2 text-red-600 hover:bg-red-50"
                ></button>
              </div>
            </div>
          ))}
        </div>
        <ClinicModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          clinic={clinic}
          setClinic={setClinic}
          editing={editing}
          onSave={saveClinic}
        />
      </div>
    </div>
  );
}
