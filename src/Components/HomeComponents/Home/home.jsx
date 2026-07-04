import useDarkMode from '../../../Hooks/useDarkMode';
import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  CalendarCheck,
  Building2,
  Activity,
  ArrowRight,
  Heart,
  Baby,
  ShieldCheck,
  CheckCircle2,
  Users,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const STATS = [
  { label: "Verified Clinics", value: "50+" },
  { label: "Specialist Doctors", value: "300+" },
  { label: "Happy Patients", value: "10k+" },
];

const FEATURES = [
  {
    icon: CalendarCheck,
    title: "Instant Booking",
    desc: "Select your doctor, pick your preferred time slot, and secure your visit instantly.",
  },
  {
    icon: Building2,
    title: "Top Rated Clinics",
    desc: "Browse fully verified clinics with extensive details regarding address and pricing.",
  },
  {
    icon: Stethoscope,
    title: "Expert Specialists",
    desc: "Filter by various medical fields such as Surgery, Dentistry, and Pediatrics easily.",
  },
];

const SPECIALTIES = [
  { icon: Heart, label: "Cardiology", color: "rose" },
  { icon: Stethoscope, label: "Surgery", color: "teal" },
  { icon: Baby, label: "Pediatrics", color: "amber" },
  { icon: Activity, label: "General Health", color: "indigo" },
];

const SPECIALTY_STYLES = {
  rose: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
  teal: "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400",
  amber: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  indigo: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
};

function Home() {
  useDarkMode();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* 1. Hero Section */}
      <div className="relative overflow-hidden">
        {/* Subtle dot-grid backdrop for depth */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.4] dark:opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgb(148 163 184) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />

        <div className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" /> Your Trusted Healthcare Companion
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
              Your Health, Our Priority <br />
              <span className="text-teal-600 dark:text-teal-400">Find & Book Best Clinics</span>
            </h1>
            <p className="text-base text-slate-500 dark:text-slate-400 max-w-lg">
              Connect with specialized doctors, manage your appointments, and take control of your healthcare journey seamlessly with Clinix.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                onClick={() => navigate("/clinics")}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl px-6 py-5 flex items-center gap-2 shadow-lg shadow-teal-600/20"
              >
                Explore Clinics <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => navigate("/myAppointments")}
                variant="outline"
                className="border-slate-200 dark:border-slate-800 rounded-xl px-6 py-5 font-semibold"
              >
                View My Bookings
              </Button>
            </div>

            {/* Trust stats */}
            <div className="flex flex-wrap items-center gap-8 pt-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center relative">
            <div className="absolute inset-0 bg-teal-100 dark:bg-teal-900/20 blur-3xl rounded-full h-72 w-72 mx-auto my-auto -z-10"></div>

            <div className="bg-gradient-to-br from-teal-50 to-white dark:from-slate-900 dark:to-slate-950 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl max-w-sm w-full space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-teal-500/30">
                  C
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Clinix Smart System</h4>
                  <p className="text-xs text-slate-400">Making healthcare easier</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-full"></div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-5/6"></div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-2/3"></div>
              </div>
              <div className="pt-2 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">System Ready</span>
                <Activity className="h-4 w-4 text-teal-500 animate-pulse" />
              </div>
            </div>

            {/* Floating confirmation badge for depth */}
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">Appointment Confirmed</p>
                <p className="text-[10px] text-slate-400">Dr. Sarah Johnson · 10:30 AM</p>
              </div>
            </div>

            {/* Floating rating badge */}
            <div className="absolute -top-3 -right-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg rounded-2xl px-3 py-2 flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">4.9</span>
              <span className="text-[10px] text-slate-400">rated</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Features Section */}
      <div className="bg-white dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-900 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why Choose Clinix?</h2>
            <p className="text-sm text-slate-400 mt-2">Everything you need to manage your medical visits in one platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <Card
                key={feature.title}
                className="group relative border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-black/20 hover:border-teal-200 dark:hover:border-teal-800"
              >
                <span className="absolute top-5 right-6 text-4xl font-black text-slate-50 dark:text-slate-800/80 select-none">
                  0{i + 1}
                </span>
                <CardContent className="p-0 space-y-4 relative">
                  <div className="h-10 w-10 rounded-xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400 transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{feature.title}</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Popular Specializations */}
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Popular Specializations</h2>
            <p className="text-sm text-slate-400 mt-1">Find healthcare providers by medical specialty</p>
          </div>
          <Button
            onClick={() => navigate("/clinics")}
            variant="link"
            className="text-teal-600 dark:text-teal-400 font-semibold p-0 flex items-center gap-1"
          >
            See All <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {SPECIALTIES.map((spec) => (
            <div
              key={spec.label}
              onClick={() => navigate("/clinics")}
              className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-black/20 hover:border-teal-300 dark:hover:border-teal-700"
            >
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${SPECIALTY_STYLES[spec.color]}`}
              >
                <spec.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {spec.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Closing CTA */}
      <div className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-emerald-600 px-8 py-14 text-center">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-4">
              <Users className="h-3.5 w-3.5" /> Join thousands of patients
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Ready to take control of your healthcare?
            </h2>
            <p className="text-sm text-teal-50/90 mt-2 max-w-md mx-auto">
              Book your first appointment in minutes — no calls, no waiting rooms.
            </p>
            <Button
              onClick={() => navigate("/clinics")}
              className="mt-6 bg-white text-teal-700 hover:bg-teal-50 font-semibold rounded-xl px-6 py-5 flex items-center gap-2 mx-auto shadow-lg"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
