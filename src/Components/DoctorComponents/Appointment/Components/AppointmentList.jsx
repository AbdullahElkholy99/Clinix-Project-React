import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CalendarDays } from "lucide-react";

import {
  getDoctorClinicAppointments,
  updateAppointment,
  deleteAppointment,
} from "../Services/appointmentService";

import AppointmentItem from "./AppointmentItem";
import EditAppointmentDialog from "./EditAppointmentDialog";
import DeleteAppointmentDialog from "./DeleteAppointmentDialog";

import { Card, CardContent } from "@/Components/ui/card";

export default function AppointmentList({
  clinicId,
  clinicName,
}) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteAppointment, setPendingDeleteAppointment] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!clinicId) return;

    loadAppointments();
  }, [clinicId]);

  const loadAppointments = async () => {
    try {
      setLoading(true);

      const response = await getDoctorClinicAppointments(clinicId);

      setAppointments(response.data || response || []);
    } catch (error) {
      console.error(error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async (formValues) => {
    try {
      setSavingEdit(true);

      await updateAppointment(editingAppointment.id, formValues);

      toast.success("Appointment updated successfully.");

      setEditDialogOpen(false);
      setEditingAppointment(null);

      await loadAppointments();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update appointment.");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDeleteClick = (appointment) => {
    setPendingDeleteAppointment(appointment);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async (appointment) => {
    setDeleteDialogOpen(false);

    try {
      setDeletingId(appointment.id);

      await deleteAppointment(appointment.id);

      toast.success("Appointment deleted successfully.");

      await loadAppointments();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to delete appointment.");
    } finally {
      setDeletingId(null);
      setPendingDeleteAppointment(null);
    }
  };

  return (
    <section className="mt-10">

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">

          <CalendarDays size={24} />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Clinic Appointments
          </h2>

          <p className="text-slate-500 dark:text-slate-400">
            {clinicName}
          </p>

        </div>

      </div>

      {loading ? (
        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="py-10 text-center text-slate-500 dark:text-slate-400">
            Loading appointments...
          </CardContent>
        </Card>
      ) : appointments.length === 0 ? (
        <Card className="border-dashed border-slate-300 dark:border-slate-700">
          <CardContent className="py-12 text-center">

            <CalendarDays
              size={40}
              className="mx-auto mb-4 text-slate-400"
            />

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              No Appointments Found
            </h3>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Create your first appointment for this clinic.
            </p>

          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">

          {appointments.map((appointment) => (
            <AppointmentItem
              key={appointment.id}
              appointment={appointment}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              isDeleting={deletingId === appointment.id}
            />
          ))}

        </div>
      )}

      <EditAppointmentDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        appointment={editingAppointment}
        loading={savingEdit}
        onSave={handleSaveEdit}
      />

      <DeleteAppointmentDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        appointment={pendingDeleteAppointment}
        onConfirm={confirmDelete}
      />

    </section>
  );
}