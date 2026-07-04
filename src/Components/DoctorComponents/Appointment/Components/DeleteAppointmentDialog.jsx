import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";

export default function DeleteAppointmentDialog({
  open,
  onOpenChange,
  appointment,
  onConfirm,
}) {
  if (!appointment) return null;

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Delete Appointment
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete the appointment for{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {appointment.day}
            </span>{" "}
            ({appointment.openAt} → {appointment.closedAt})? This
            action cannot be undone.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() => onConfirm(appointment)}
            className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
          >
            Delete
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}