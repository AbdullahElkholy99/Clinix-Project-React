import {
  Plus,
  CalendarPlus,
  Users,
  Building2,
  ClipboardList,
  Clock3,
  Stethoscope,
  FileText,
} from "lucide-react";

const actions = [
  {
    id: 1,
    title: "New Appointment",
    description: "Book a patient appointment",
    icon: CalendarPlus,
    color: "bg-blue-100 text-blue-600",
    onClick: () => console.log("New Appointment"),
  },
  {
    id: 2,
    title: "Add Patient",
    description: "Register a new patient",
    icon: Users,
    color: "bg-green-100 text-green-600",
    onClick: () => console.log("Add Patient"),
  },
  {
    id: 3,
    title: "My Clinics",
    description: "Manage your clinics",
    icon: Building2,
    color: "bg-purple-100 text-purple-600",
    onClick: () => console.log("Clinics"),
  },
  {
    id: 4,
    title: "Medical Records",
    description: "Patient medical history",
    icon: ClipboardList,
    color: "bg-orange-100 text-orange-600",
    onClick: () => console.log("Medical Records"),
  },
  {
    id: 5,
    title: "Working Hours",
    description: "Update clinic schedule",
    icon: Clock3,
    color: "bg-cyan-100 text-cyan-600",
    onClick: () => console.log("Working Hours"),
  },
  {
    id: 6,
    title: "Services",
    description: "Manage clinic services",
    icon: Stethoscope,
    color: "bg-pink-100 text-pink-600",
    onClick: () => console.log("Services"),
  },
  {
    id: 7,
    title: "Prescriptions",
    description: "Create new prescription",
    icon: FileText,
    color: "bg-emerald-100 text-emerald-600",
    onClick: () => console.log("Prescription"),
  },
  {
    id: 8,
    title: "New Clinic",
    description: "Create another clinic",
    icon: Plus,
    color: "bg-indigo-100 text-indigo-600",
    onClick: () => console.log("New Clinic"),
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Frequently used actions
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4 p-6">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className="group rounded-xl border border-slate-200 p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}
              >
                <Icon size={22} />
              </div>

              <h3 className="font-semibold text-slate-800 transition group-hover:text-blue-600">
                {action.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}