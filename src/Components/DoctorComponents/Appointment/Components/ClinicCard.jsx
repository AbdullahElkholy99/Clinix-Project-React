import { Building2, MapPin, CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

export default function ClinicCard({
  clinic,
  selected,
  onSelect,
}) {
  return (
    <Card
      onClick={() => onSelect(clinic)}
      className={`
        cursor-pointer
        border-2
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        ${
          selected
            ? "border-blue-600 shadow-lg ring-2 ring-blue-100"
            : "border-slate-200 hover:border-blue-300"
        }
      `}
    >
      <CardContent className="p-6">

        <div className="flex items-start justify-between">

          <div
            className={`
              flex h-14 w-14 items-center justify-center rounded-2xl
              ${
                selected
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-600"
              }
            `}
          >
            <Building2 size={28} />
          </div>

          {selected && (
            <CheckCircle2
              size={24}
              className="text-green-500"
            />
          )}

        </div>

        <h3 className="mt-6 text-xl font-bold text-slate-800">
          {clinic.clinicName}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-slate-500">
          <MapPin size={16} />
          <span>{clinic.address}</span>
        </div>

        <Button
          className="mt-6 w-full"
          variant={selected ? "default" : "outline"}
        >
          {selected ? "Selected Clinic" : "Select Clinic"}
        </Button>

      </CardContent>
    </Card>
  );
}