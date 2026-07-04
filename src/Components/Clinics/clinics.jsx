import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctorClinics } from "./Services/clinicService";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Phone, ArrowRight, Building2, AlertCircle } from "lucide-react";

function ClinicCardSkeleton() {
  return (
    <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 flex flex-col items-center h-full">
      <Skeleton className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800" />
      <Skeleton className="h-5 w-2/3 mt-4 bg-slate-100 dark:bg-slate-800" />
      <Skeleton className="h-4 w-1/3 mt-2 bg-slate-100 dark:bg-slate-800" />
      <div className="w-full border-t border-slate-100 dark:border-slate-800 mt-5 pt-5 space-y-2">
        <Skeleton className="h-4 w-4/5 mx-auto bg-slate-100 dark:bg-slate-800" />
        <Skeleton className="h-4 w-2/3 mx-auto bg-slate-100 dark:bg-slate-800" />
      </div>
      <Skeleton className="h-9 w-24 rounded-full mt-6 bg-slate-100 dark:bg-slate-800" />
      <Skeleton className="h-10 w-full rounded-xl mt-4 bg-slate-100 dark:bg-slate-800" />
    </Card>
  );
}

function Clinics() {
  const navigate = useNavigate();
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const data = await getDoctorClinics();
        setClinics(data);
      } catch (err) {
        console.error("Failed to load clinics:", err);
        setError("We couldn't load the clinics. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 text-xs font-medium">
            <Building2 className="h-3.5 w-3.5" />
            Doctor Locations
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Clinics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            {loading
              ? "Fetching available clinics..."
              : `${clinics.length} clinic${clinics.length === 1 ? "" : "s"} available for booking`}
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ClinicCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center text-center py-24 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-slate-900/50">
            <div className="h-12 w-12 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && clinics.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-24 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-slate-900/50">
            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              <Building2 className="h-6 w-6 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              No clinics found
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
              This doctor hasn't added any clinics yet.
            </p>
          </div>
        )}

        {/* Clinics grid */}
        {!loading && !error && clinics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinics.map((clinic) => (
              <Card
                key={clinic.id}
                onClick={() => navigate(`/clinics/${clinic.id}`)}
                className="group flex flex-col h-full border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-black/20 hover:border-teal-300 dark:hover:border-teal-700"
              >
                <CardContent className="flex flex-col items-center text-center flex-1 p-6">
                  <div className="h-14 w-14 rounded-2xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-4">
                    {clinic.clinicName}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    {clinic.city}
                  </p>

                  <div className="w-full border-t border-slate-100 dark:border-slate-800 mt-5 pt-5 space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span className="truncate">
                        {clinic.city}, {clinic.area}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span>{clinic.phone}</span>
                    </div>
                  </div>

                  <div className="mt-6 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 font-bold text-sm">
                    {clinic.price}
                    <span className="ml-1 text-[10px] font-medium opacity-70">EGP</span>
                  </div>
                </CardContent>

                <div className="px-6 pb-6">
                  <Button className="w-full rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-teal-600 dark:hover:bg-teal-500 dark:hover:text-white transition-colors duration-200">
                    View Details
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Clinics;
