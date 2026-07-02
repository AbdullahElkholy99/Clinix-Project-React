import ClinicCard from "./ClinicCard";

export default function ClinicGrid({
  clinics,
  selectedClinic,
  onSelectClinic,
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

      {clinics.map((clinic) => (

        <ClinicCard
          key={clinic.id}
          clinic={clinic}
          selected={selectedClinic?.id === clinic.id}
          onSelect={onSelectClinic}
        />

      ))}

    </div>
  );
}