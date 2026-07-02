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
          key={clinic.doctorClinicId}
          clinic={clinic}
          selected={
            selectedClinic?.doctorClinicId ===
            clinic.doctorClinicId
          }
          onSelect={onSelectClinic}
        />

      ))}

    </div>
  );
}