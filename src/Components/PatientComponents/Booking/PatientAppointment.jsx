import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Clock,
  Stethoscope,
  ChevronLeft,
  CheckCircle2,
  CalendarDays,
  Phone,
  Star,
} from "lucide-react";

// import {getAllClinics} from '../../DoctorComponents/Services/clinic-service'
// ---------------------------------------------------------------------------
// Mock data — swap for real API responses
// ---------------------------------------------------------------------------

const DOCTOR = {
  name: "Dr. Abdullah Ali",
  specialty: "Cardiology",
  rating: 4.9,
  reviews: 214,
};

const CLINICS = [
  {
    id: "c1",
    name: "Nile Heart & Vascular Center",
    address: "14 Tahrir St, Downtown",
    distanceKm: 1.2,
    phone: "+20 2 1234 5678",
    nextAvailable: "Today",
    days: [
      {
        date: "Wed, Jul 3",
        slots: ["09:00 AM", "09:30 AM", "11:00 AM", "02:15 PM", "04:00 PM"],
      },
      {
        date: "Thu, Jul 4",
        slots: ["08:30 AM", "10:00 AM", "01:00 PM"],
      },
      {
        date: "Fri, Jul 5",
        slots: ["09:00 AM", "12:30 PM", "03:45 PM", "05:00 PM"],
      },
    ],
  },
  {
    id: "c2",
    name: "Maadi Family Clinic",
    address: "27 Road 9, Maadi",
    distanceKm: 4.8,
    phone: "+20 2 9876 5432",
    nextAvailable: "Tomorrow",
    days: [
      {
        date: "Thu, Jul 4",
        slots: ["10:30 AM", "11:15 AM", "03:00 PM"],
      },
      {
        date: "Fri, Jul 5",
        slots: ["09:15 AM", "10:00 AM", "02:00 PM", "04:30 PM"],
      },
    ],
  },
  {
    id: "c3",
    name: "New Cairo Wellness Hospital",
    address: "5th Settlement, New Cairo",
    distanceKm: 12.6,
    phone: "+20 2 5551 2233",
    nextAvailable: "Fri, Jul 5",
    days: [
      {
        date: "Fri, Jul 5",
        slots: ["08:00 AM", "08:45 AM", "01:30 PM"],
      },
      {
        date: "Sat, Jul 6",
        slots: ["09:00 AM", "09:45 AM", "11:30 AM", "02:00 PM"],
      },
    ],
  },
];

const STEPS = ["Clinic", "Appointment", "Confirm"];

// ---------------------------------------------------------------------------

export default function PatientAppointment() {
  const [stepIndex, setStepIndex] = useState(0);
  const [clinicId, setClinicId] = useState(null);
  const [dayIndex, setDayIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const clinic = useMemo(
    () => CLINICS.find((c) => c.id === clinicId) || null,
    [clinicId],
  );

  function chooseClinic(id) {
    setClinicId(id);
    setDayIndex(0);
    setSelectedSlot(null);
    setStepIndex(1);
  }

  function chooseSlot(day, time) {
    setSelectedSlot({ date: day, time });
  }

  function goToConfirm() {
    if (selectedSlot) setStepIndex(2);
  }

  function confirmBooking() {
    setBooked(true);
  }

  function backTo(index) {
    setBooked(false);
    setStepIndex(index);
  }

  function startOver() {
    setBooked(false);
    setClinicId(null);
    setSelectedSlot(null);
    setDayIndex(0);
    setStepIndex(0);
  }

  return (
    <div
      className="min-h-screen w-full bg-[#F5F8F8] px-4 py-10 sm:px-8"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      <div className="mx-auto max-w-3xl">
        <Header />
        <Stepper stepIndex={stepIndex} />

        {stepIndex === 0 && (
          <ClinicStep
            doctor={DOCTOR}
            clinics={CLINICS}
            onChoose={chooseClinic}
          />
        )}

        {stepIndex === 1 && clinic && (
          <AppointmentStep
            clinic={clinic}
            dayIndex={dayIndex}
            setDayIndex={setDayIndex}
            selectedSlot={selectedSlot}
            onChooseSlot={chooseSlot}
            onBack={() => backTo(0)}
            onNext={goToConfirm}
          />
        )}

        {stepIndex === 2 && clinic && selectedSlot && !booked && (
          <ConfirmStep
            doctor={DOCTOR}
            clinic={clinic}
            slot={selectedSlot}
            onBack={() => backTo(1)}
            onConfirm={confirmBooking}
          />
        )}

        {stepIndex === 2 && booked && (
          <SuccessStep
            doctor={DOCTOR}
            clinic={clinic}
            slot={selectedSlot}
            onStartOver={startOver}
          />
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

function Header() {
  return (
    <div className="mb-8">
      <p
        className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0E7C7B]"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        Book an appointment
      </p>
      <h1
        className="mt-1 text-2xl font-semibold text-[#172227] sm:text-3xl"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Find a time that works for you
      </h1>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stepper — signature "pulse line" progress indicator
// ---------------------------------------------------------------------------

function Stepper({ stepIndex }) {
  return (
    <div className="mb-8 flex items-center">
      {STEPS.map((label, i) => {
        const state =
          i < stepIndex ? "done" : i === stepIndex ? "active" : "upcoming";
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={
                  "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors " +
                  (state === "done"
                    ? "border-[#0E7C7B] bg-[#0E7C7B] text-white"
                    : state === "active"
                      ? "border-[#0E7C7B] bg-white text-[#0E7C7B]"
                      : "border-[#D8E0E0] bg-white text-[#9AAAAA]")
                }
              >
                {state === "done" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={
                  "text-[11px] font-medium uppercase tracking-wide " +
                  (state === "upcoming" ? "text-[#9AAAAA]" : "text-[#172227]")
                }
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <svg
                className="mx-2 h-5 flex-1"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <polyline
                  points="0,10 30,10 38,2 46,18 54,10 100,10"
                  fill="none"
                  stroke={i < stepIndex ? "#0E7C7B" : "#D8E0E0"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 1 — choose a clinic
// ---------------------------------------------------------------------------

function ClinicStep({ doctor, clinics, onChoose }) {
  return (
    <div>
      <DoctorBanner doctor={doctor} />
      <p className="mb-3 text-sm font-medium text-[#172227]">
        Choose a clinic ({clinics.length} nearby)
      </p>
      <div className="grid gap-3">
        {clinics.map((c) => (
          <Card
            key={c.id}
            className="cursor-pointer border-[#E1E8E8] bg-white transition-colors hover:border-[#0E7C7B]"
            onClick={() => onChoose(c.id)}
          >
            <CardContent className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate font-semibold text-[#172227]">
                  {c.name}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-sm text-[#64777C]">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {c.address} · {c.distanceKm} km away
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-sm text-[#64777C]">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  {c.phone}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <Badge className="border-none bg-[#E1F5EE] text-[#085041] hover:bg-[#E1F5EE]">
                  Next: {c.nextAvailable}
                </Badge>
                <Button
                  size="sm"
                  className="bg-[#0E7C7B] text-white hover:bg-[#0B5D5C]"
                >
                  Select
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DoctorBanner({ doctor }) {
  return (
    <Card className="mb-6 border-[#E1E8E8] bg-white">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E1F5EE] text-[#0E7C7B]">
          <Stethoscope className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p
            className="font-semibold text-[#172227]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {doctor.name}
          </p>
          <p className="text-sm text-[#64777C]">{doctor.specialty}</p>
        </div>
        <div className="ml-auto flex items-center gap-1 text-sm text-[#172227]">
          <Star className="h-4 w-4 fill-[#D89B3D] text-[#D89B3D]" />
          <span className="font-medium">{doctor.rating}</span>
          <span className="text-[#9AAAAA]">({doctor.reviews})</span>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Step 2 — choose an appointment slot
// ---------------------------------------------------------------------------

function AppointmentStep({
  clinic,
  dayIndex,
  setDayIndex,
  selectedSlot,
  onChooseSlot,
  onBack,
  onNext,
}) {
  const activeDay = clinic.days[dayIndex];

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1 text-sm font-medium text-[#0E7C7B] hover:underline"
      >
        <ChevronLeft className="h-4 w-4" />
        Change clinic
      </button>

      <Card className="mb-6 border-[#E1E8E8] bg-white">
        <CardContent className="p-4">
          <p className="font-semibold text-[#172227]">{clinic.name}</p>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-[#64777C]">
            <MapPin className="h-3.5 w-3.5" />
            {clinic.address}
          </p>
        </CardContent>
      </Card>

      <p className="mb-3 flex items-center gap-2 text-sm font-medium text-[#172227]">
        <CalendarDays className="h-4 w-4 text-[#0E7C7B]" />
        Pick a day
      </p>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {clinic.days.map((d, i) => (
          <button
            key={d.date}
            onClick={() => setDayIndex(i)}
            className={
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
              (i === dayIndex
                ? "border-[#0E7C7B] bg-[#0E7C7B] text-white"
                : "border-[#D8E0E0] bg-white text-[#172227] hover:border-[#0E7C7B]")
            }
          >
            {d.date}
          </button>
        ))}
      </div>

      <p className="mb-3 flex items-center gap-2 text-sm font-medium text-[#172227]">
        <Clock className="h-4 w-4 text-[#0E7C7B]" />
        Available times · {activeDay.date}
      </p>
      <div className="mb-8 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {activeDay.slots.map((time) => {
          const isSelected =
            selectedSlot &&
            selectedSlot.date === activeDay.date &&
            selectedSlot.time === time;
          return (
            <button
              key={time}
              onClick={() => onChooseSlot(activeDay.date, time)}
              className={
                "rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors " +
                (isSelected
                  ? "border-[#D89B3D] bg-[#FAEEDA] text-[#633806]"
                  : "border-[#D8E0E0] bg-white text-[#172227] hover:border-[#0E7C7B]")
              }
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {time}
            </button>
          );
        })}
      </div>

      <Button
        disabled={!selectedSlot}
        onClick={onNext}
        className="w-full bg-[#0E7C7B] text-white hover:bg-[#0B5D5C] disabled:opacity-40"
      >
        Continue to confirm
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 3 — confirm booking
// ---------------------------------------------------------------------------

function ConfirmStep({ doctor, clinic, slot, onBack, onConfirm }) {
  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1 text-sm font-medium text-[#0E7C7B] hover:underline"
      >
        <ChevronLeft className="h-4 w-4" />
        Change time
      </button>

      <Card className="border-[#E1E8E8] bg-white">
        <CardContent className="p-6">
          <p
            className="mb-4 text-lg font-semibold text-[#172227]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Review your appointment
          </p>

          <div className="space-y-4">
            <Row
              label="Doctor"
              value={`${doctor.name} · ${doctor.specialty}`}
            />
            <Row label="Clinic" value={clinic.name} />
            <Row label="Address" value={clinic.address} />
            <Separator className="bg-[#E1E8E8]" />
            <Row label="Date" value={slot.date} />
            <Row label="Time" value={slot.time} mono />
          </div>

          <Separator className="my-5 bg-[#E1E8E8]" />

          <Button
            onClick={onConfirm}
            className="w-full bg-[#0E7C7B] text-white hover:bg-[#0B5D5C]"
          >
            Confirm booking
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, value, mono }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-[#64777C]">{label}</span>
      <span
        className="text-right text-sm font-medium text-[#172227]"
        style={mono ? { fontFamily: "'IBM Plex Mono', monospace" } : undefined}
      >
        {value}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 3b — success
// ---------------------------------------------------------------------------

function SuccessStep({ doctor, clinic, slot, onStartOver }) {
  return (
    <Card className="border-[#E1E8E8] bg-white">
      <CardContent className="flex flex-col items-center p-8 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E1F5EE] text-[#0E7C7B]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <p
          className="text-lg font-semibold text-[#172227]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Appointment booked
        </p>
        <p className="mt-1 text-sm text-[#64777C]">
          {slot.date} at {slot.time} with {doctor.name}
        </p>
        <p className="mt-0.5 text-sm text-[#64777C]">{clinic.name}</p>

        <Button
          variant="outline"
          onClick={onStartOver}
          className="mt-6 border-[#D8E0E0] text-[#172227] hover:bg-[#F0F4F4]"
        >
          Book another appointment
        </Button>
      </CardContent>
    </Card>
  );
}
