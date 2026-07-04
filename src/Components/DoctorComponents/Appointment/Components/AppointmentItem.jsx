import { CalendarDays, Clock3, Pencil, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

export default function AppointmentItem({
  appointment,
  onEdit,
  onDelete,
  isDeleting,
}) {
  return (
    <Card className="border-slate-200 bg-white transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">

        <div className="space-y-3">

          <div className="flex items-center gap-2">

            <CalendarDays
              size={18}
              className="text-blue-600"
            />

            <span className="font-semibold text-slate-900 dark:text-white">
              {appointment.day}
            </span>

          </div>

          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">

            <Clock3
              size={18}
              className="text-blue-600"
            />

            <span>
              {appointment.openAt} → {appointment.closedAt}
            </span>

          </div>

        </div>

        <div className="flex gap-3">

          <Button
            variant="outline"
            onClick={() => onEdit?.(appointment)}
            disabled={isDeleting}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <Button
            variant="destructive"
            onClick={() => onDelete?.(appointment)}
            disabled={isDeleting}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>

        </div>

      </CardContent>
    </Card>
  );
}