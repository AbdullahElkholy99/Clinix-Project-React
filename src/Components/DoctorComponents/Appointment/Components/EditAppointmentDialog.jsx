import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";

import AppointmentForm from "./AppointmentForm";

export default function EditAppointmentDialog({
  open,
  onOpenChange,
  appointment,
  loading,
  onSave,
}) {
  if (!appointment) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">

        <DialogHeader>
          <DialogTitle>Edit Appointment</DialogTitle>
          <DialogDescription>
            Update the working day and hours for this appointment.
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          key={appointment.id}
          mode="edit"
          initialData={{
            day: appointment.day,
            openAt: appointment.openAt,
            closedAt: appointment.closedAt,
          }}
          loading={loading}
          onSubmit={onSave}
          onCancel={() => onOpenChange(false)}
        />

      </DialogContent>
    </Dialog>
  );
}