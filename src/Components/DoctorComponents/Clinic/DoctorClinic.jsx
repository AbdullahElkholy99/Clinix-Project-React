import { useState, useEffect } from "react";
import { Plus, Search, Building2 } from "lucide-react";
import ClinicModal from "./ClinicModel";
const emptyClinic = {
  clinicName: "",
  address: "",
  phone: "",
  status: "Open",
};
import {
  addClinic,
  getAllClinics,
  editClinic,
  deleteClinic,
} from "../Services/clinic-service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function DoctorClinic() {
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [clinics, setClinics] = useState([]);
  const [clinic, setClinic] = useState(emptyClinic);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchClinics = async () => {
      const data = await getAllClinics();
      console.log("Fetched clinics:", data); // Log the fetched clinics for debugging
      if (data) {
        setClinics(data);
      }
    };
    fetchClinics();
  }, []);

  //done

  const saveClinic = async () => {
    try {
      setSaving(true);

      if (editing) {
        console.log("edit clinic:", clinic);
        var edit = await editClinic(editingId, clinic);
        console.log("Edit response:", edit); // Log the response from the editClinic function for debugging

        if (edit === "Success Updated") {
          toast.success("Clinic Updated successfully!", {
            position: "top-right",
            style: { backgroundColor: "#4CAF50", color: "white" },
          });
        } else {
          toast.error("Failed to update clinic. Please try again.", {
            position: "top-right",
            style: { backgroundColor: "#f44336", color: "white" },
          });
        }
        setClinics((prev) =>
          prev.map((c) =>
            c.id === editingId ? { ...clinic, id: editingId } : c,
          ),
        );
      } else {
        var add = await addClinic(clinic);
        if (add === "Doctor Added Clinic Address Successful") {
          toast.success("Clinic added successfully!", {
            position: "top-right",
            style: { backgroundColor: "#4CAF50", color: "white" },
          });
        } else {
          toast.error("Failed to add clinic. Please try again.", {
            position: "top-right",
            style: { backgroundColor: "#f44336", color: "white" },
          });
        }
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
    } catch (error) {
      console.error("Error saving clinic:", error);
      toast.error(
        "An error occurred while saving the clinic. Please try again.",
        {
          position: "top-right",
          style: { backgroundColor: "#f44336", color: "white" },
        },
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClinic = async (id) => {
    try {
      setDeletingId(id);

      const deleteResponse = await deleteClinic(id);
      if (deleteResponse === "Success Deleted") {
        toast.success("Clinic deleted successfully!", {
          position: "top-right",
          style: { backgroundColor: "#4CAF50", color: "white" },
        });
        setClinics((prev) => prev.filter((clinic) => clinic.id !== id));
      } else {
        toast.error("Failed to delete clinic. Please try again.", {
          position: "top-right",
          style: { backgroundColor: "#f44336", color: "white" },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-11/12 px-6 py-8">
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
                      {clinic.clinicName}
                    </h2>

                    <p className="text-sm text-slate-500">
                      {clinic.governorate} - {clinic.city} - {clinic.area} -{" "}
                      {clinic.street}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone</span>
                  <span>{clinic.phone}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
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
                  onClick={() => handleDeleteClinic(clinic.id)}
                  disabled={deletingId === clinic.id}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 py-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {deletingId === clinic.id ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
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
          saving={saving}
          onSave={saveClinic}
        />
      </div>
    </div>
  );
}
