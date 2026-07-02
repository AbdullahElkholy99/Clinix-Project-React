import { Building2 } from "lucide-react";

export default function EmptyState({
  title = "No Clinics Found",
  description = "You don't have any clinics yet.",
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-white py-20">

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">

        <Building2
          size={38}
          className="text-slate-500"
        />

      </div>

      <h2 className="mt-6 text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-slate-500">
        {description}
      </p>

    </div>
  );
}