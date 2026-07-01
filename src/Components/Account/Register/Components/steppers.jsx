import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Personal",
    description: "Basic information",
  },
  {
    id: 2,
    title: "Security",
    description: "Account password",
  },
  {
    id: 3,
    title: "Role",
    description: "Doctor / Patient",
  },
  {
    id: 4,
    title: "Terms",
    description: "Accept terms",
  },
];

export default function Stepper({ currentStep = 0 }) {
  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const completed = index < currentStep;
          const active = index === currentStep;

          return (
            <div
              key={step.id}
              className={`flex items-center ${
                index !== steps.length - 1 ? "flex-1" : ""
              }`}
            >
              {/* Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full border-2 font-semibold transition-all duration-300",

                    completed &&
                      "bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-500/30",

                    active &&
                      "border-teal-600 bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400",

                    !completed &&
                      !active &&
                      "border-slate-300 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500",
                  )}
                >
                  {completed ? <Check className="h-5 w-5" /> : step.id}
                </div>

                <div className="mt-3 text-center">
                  <p
                    className={cn(
                      "text-sm font-semibold transition-colors",

                      active && "text-teal-600 dark:text-teal-400",

                      completed && "text-slate-900 dark:text-white",

                      !completed &&
                        !active &&
                        "text-slate-400 dark:text-slate-500",
                    )}
                  >
                    {step.title}
                  </p>

                  <p className="mt-1 hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Line */}
              {index !== steps.length - 1 && (
                <div className="mx-4 flex-1">
                  <div
                    className="h-1 overflow-hidden 
                  rounded-full bg-slate-200
                   dark:bg-slate-800
                   mb-10
                   "
                  >
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        completed ? "w-full bg-teal-600" : "w-0 bg-teal-600",
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
