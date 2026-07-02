import { useState } from "react";
import { X } from "lucide-react";
import { Loader2 } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

export default function ClinicModal({
  open,
  onClose,
  clinic,
  setClinic,
  saving,
  onSave,
  editing,
}) {
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const validate = () => {
    const newErrors = {};

    if (!clinic.governorate?.trim()) {
      newErrors.governorate = "Governorate is required";
    }

    if (!clinic.city?.trim()) {
      newErrors.city = "City is required";
    }

    if (!clinic.area?.trim()) {
      newErrors.area = "Area is required";
    }

    if (!clinic.street?.trim()) {
      newErrors.street = "Street is required";
    }

    if (!clinic.phone?.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^01[0125][0-9]{8}$/.test(clinic.phone)) {
      newErrors.phone = "Please enter a valid Egyptian phone number.";
    }

    if (!clinic.price) {
      newErrors.price = "Price is required";
    } else if (Number(clinic.price) <= 0) {
      newErrors.price = "Price must be greater than zero.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setClinic({
      ...clinic,
      [field]: value,
    });

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleSave = () => {
    if (validate()) {
      onSave();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {editing ? "Edit Clinic" : "Create New Clinic"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
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
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="grid gap-5 md:grid-cols-2">
            {/* Governorate */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Governorate
              </label>

              <input
                className={`${inputClass} ${
                  errors.governorate ? "border-red-500 focus:ring-red-100" : ""
                }`}
                value={clinic.governorate || ""}
                onChange={(e) => handleChange("governorate", e.target.value)}
              />

              {errors.governorate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.governorate}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="mb-2 block text-sm font-medium">City</label>

              <input
                className={`${inputClass} ${
                  errors.city ? "border-red-500 focus:ring-red-100" : ""
                }`}
                value={clinic.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
              />

              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city}</p>
              )}
            </div>

            {/* Area */}
            <div>
              <label className="mb-2 block text-sm font-medium">Area</label>

              <input
                className={`${inputClass} ${
                  errors.area ? "border-red-500 focus:ring-red-100" : ""
                }`}
                value={clinic.area || ""}
                onChange={(e) => handleChange("area", e.target.value)}
              />

              {errors.area && (
                <p className="mt-1 text-sm text-red-500">{errors.area}</p>
              )}
            </div>

            {/* Street */}
            <div>
              <label className="mb-2 block text-sm font-medium">Street</label>

              <input
                className={`${inputClass} ${
                  errors.street ? "border-red-500 focus:ring-red-100" : ""
                }`}
                value={clinic.street || ""}
                onChange={(e) => handleChange("street", e.target.value)}
              />

              {errors.street && (
                <p className="mt-1 text-sm text-red-500">{errors.street}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium">Phone</label>

              <input
                className={`${inputClass} ${
                  errors.phone ? "border-red-500 focus:ring-red-100" : ""
                }`}
                value={clinic.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-medium">Price</label>

              <input
                type="number"
                className={`${inputClass} ${
                  errors.price ? "border-red-500 focus:ring-red-100" : ""
                }`}
                value={clinic.price || ""}
                onChange={(e) => handleChange("price", e.target.value)}
              />

              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
              )}
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
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {editing ? "Saving..." : "Creating..."}
              </>
            ) : editing ? (
              "Save Changes"
            ) : (
              "Create Clinic"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
