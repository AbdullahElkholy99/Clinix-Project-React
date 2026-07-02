import { Building2, CheckCircle2, MapPin } from "lucide-react";

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
        bg-white
        dark:bg-slate-900
        ${
          selected
            ? "border-blue-600 ring-2 ring-blue-500/20 shadow-xl"
            : "border-slate-200 dark:border-slate-800 hover:border-blue-400"
        }
      `}
    >
      <CardContent className="p-6">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div
            className={`
              flex h-14 w-14 items-center justify-center rounded-2xl
              ${
                selected
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-600 dark:bg-blue-900/30"
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

        {/* Clinic Name */}

        <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
          {clinic.clinicName}
        </h3>

        {/* Address */}

        <div className="mt-3 flex items-start gap-2 text-slate-500 dark:text-slate-400">

          <MapPin
            size={16}
            className="mt-1 shrink-0"
          />

          <span>
            {clinic.city} • {clinic.area} • {clinic.street}
          </span>

        </div>

        {/* Price */}

        {clinic.price && (
          <div className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400">
            Consultation Price : {clinic.price} EGP
          </div>
        )}

        {/* Button */}

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