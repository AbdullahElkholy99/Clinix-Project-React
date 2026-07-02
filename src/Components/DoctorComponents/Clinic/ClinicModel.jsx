import { X } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

export default function ClinicModal({
  open,
  onClose,
  clinic,
  setClinic,
  onSave,
  editing,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {editing ? "Edit Clinic" : "Create New Clinic"}
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Fill in your clinic information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-5">

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Clinic Name
              </label>

              <input
                className={inputClass}
                placeholder="Clinix Downtown"
                value={clinic.name}
                onChange={(e) =>
                  setClinic({ ...clinic, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Specialty
              </label>

              <select
                className={inputClass}
                value={clinic.specialty}
                onChange={(e) =>
                  setClinic({ ...clinic, specialty: e.target.value })
                }
              >
                <option>General</option>
                <option>Dentist</option>
                <option>Cardiology</option>
                <option>Dermatology</option>
                <option>Pediatrics</option>
                <option>Orthopedics</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>

              <input
                className={inputClass}
                placeholder="+20 100 000000"
                value={clinic.phone}
                onChange={(e) =>
                  setClinic({ ...clinic, phone: e.target.value })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                className={inputClass}
                placeholder="clinic@clinix.com"
                value={clinic.email}
                onChange={(e) =>
                  setClinic({ ...clinic, email: e.target.value })
                }
              />
            </div>

          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Address
            </label>

            <input
              className={inputClass}
              placeholder="Street, Building..."
              value={clinic.address}
              onChange={(e) =>
                setClinic({ ...clinic, address: e.target.value })
              }
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Governorate
              </label>

              <input
                className={inputClass}
                placeholder="Cairo"
                value={clinic.city}
                onChange={(e) =>
                  setClinic({ ...clinic, city: e.target.value })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Consultation Fee
              </label>

              <input
                type="number"
                className={inputClass}
                placeholder="300"
                value={clinic.fee}
                onChange={(e) =>
                  setClinic({ ...clinic, fee: e.target.value })
                }
              />
            </div>

          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Write something about this clinic..."
              value={clinic.description}
              onChange={(e) =>
                setClinic({
                  ...clinic,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Clinic Status
              </label>

              <select
                className={inputClass}
                value={clinic.status}
                onChange={(e) =>
                  setClinic({ ...clinic, status: e.target.value })
                }
              >
                <option>Open</option>
                <option>Closed</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Clinic Image
              </label>

              <input
                type="file"
                className={inputClass}
              />
            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-5 py-2 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            {editing ? "Save Changes" : "Create Clinic"}
          </button>

        </div>

      </div>
    </div>
  );
}