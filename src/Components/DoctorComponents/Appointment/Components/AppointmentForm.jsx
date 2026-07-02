import { useState } from "react";
import { toast } from "sonner";

import { DAYS, TIME_OPTIONS } from "../AppointmentData";

import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

import {
  Building2,
  CalendarDays,
  Clock3,
} from "lucide-react";

export default function AppointmentForm({
  selectedClinic,
  loading,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    day: "",
    openAt: "",
    closedAt: "",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.day ||
      !formData.openAt ||
      !formData.closedAt
    ) {
      toast.error("Please complete all fields.");
      return;
    }

    if (formData.openAt >= formData.closedAt) {
      toast.error("Closing time must be after opening time.");
      return;
    }

    onSubmit({
      doctorClinicId: selectedClinic.id,
      day: formData.day,
      openAt: formData.openAt,
      closedAt: formData.closedAt,
    });

    setFormData({
      day: "",
      openAt: "",
      closedAt: "",
    });
  };

  return (
    <Card className="mt-10 border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">

      <CardHeader className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">

        <CardTitle className="flex items-center gap-3 text-slate-900 dark:text-white">

          <CalendarDays
            className="text-blue-600"
            size={24}
          />

          Create Appointment

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-8 pt-8">

        <div className="flex items-center gap-4 rounded-xl bg-blue-50 p-4 dark:bg-slate-800">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">

            <Building2 size={22} />

          </div>

          <div>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Selected Clinic
            </p>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {selectedClinic.clinicName}
            </h3>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div className="space-y-2">

            <Label>Day</Label>

            <Select
              value={formData.day}
              onValueChange={(value) =>
                updateField("day", value)
              }
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Select Working Day" />
              </SelectTrigger>

              <SelectContent>

                {DAYS.map((day) => (

                  <SelectItem
                    key={day}
                    value={day}
                  >
                    {day}
                  </SelectItem>

                ))}

              </SelectContent>

            </Select>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="space-y-2">

              <Label className="flex items-center gap-2">

                <Clock3 size={16} />

                Opening Time

              </Label>

              <Select
                value={formData.openAt}
                onValueChange={(value) =>
                  updateField("openAt", value)
                }
              >
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Select Opening Time" />
                </SelectTrigger>

                <SelectContent>

                  {TIME_OPTIONS.map((time) => (

                    <SelectItem
                      key={time.value}
                      value={time.value}
                    >
                      {time.label}
                    </SelectItem>

                  ))}

                </SelectContent>

              </Select>

            </div>

            <div className="space-y-2">

              <Label className="flex items-center gap-2">

                <Clock3 size={16} />

                Closing Time

              </Label>

              <Select
                value={formData.closedAt}
                onValueChange={(value) =>
                  updateField("closedAt", value)
                }
              >
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Select Closing Time" />
                </SelectTrigger>

                <SelectContent>

                  {TIME_OPTIONS.map((time) => (

                    <SelectItem
                      key={time.value}
                      value={time.value}
                    >
                      {time.label}
                    </SelectItem>

                  ))}

                </SelectContent>

              </Select>

            </div>

          </div>

          <Button
            type="submit"
            className="h-11 w-full"
            disabled={loading}
          >
            {loading
              ? "Creating Appointment..."
              : "Add Appointment"}
          </Button>

        </form>

      </CardContent>

    </Card>
  );
}