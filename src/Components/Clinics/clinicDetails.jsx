import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorClinics } from "./Services/clinicService";
import { getClinicAppointments, createAppointment } from "../PatientComponents/Booking/bookingService"; 
import { GetUserId } from "../Account/Services/tokenService";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Swal from 'sweetalert2'; 
import {
  ArrowLeft,
  Building2,
  Globe,
  MapPin,
  Signpost,
  Phone,
  Calendar, 
  ChevronDown, 
} from "lucide-react";

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="h-9 w-9 shrink-0 rounded-lg bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center">
        <Icon className="h-4 w-4 text-teal-600 dark:text-teal-400" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mt-0.5">
          {value}
        </p>
      </div>
    </div>
  );
}

function ClinicDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clinic, setClinic] = useState(null);
  const [appointments, setAppointments] = useState([]); 
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false); 

  useEffect(() => {
    const fetchClinicAndAppointments = async () => {
      try {
        const allClinics = await getDoctorClinics();
        const selectedClinic = allClinics.find((item) => item.id === id);
        setClinic(selectedClinic);

        if (selectedClinic) {
          const appointmentsData = await getClinicAppointments(id);
          setAppointments(appointmentsData || []);
        }
      } catch (error) {
        console.error("Failed to fetch clinic details or appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchClinicAndAppointments();
  }, [id]);

  const handleBookAppointment = async () => {
    if (!selectedAppointmentId) {
      Swal.fire({
        text: 'Please select an appointment time first!',
        icon: 'warning',
        confirmButtonColor: '#0d9488'
      });
      return;
    }

    try {
      setBookingLoading(true);
      const patientId = GetUserId();
          localStorage.setItem(`clinicName_${selectedAppointmentId}`, clinic.clinicName);
          localStorage.setItem(`clinicLocation_${selectedAppointmentId}`, `${clinic.city}, ${clinic.area}`);
      const bookingPayload = {
        PatientId: patientId,
        DoctorId: "ce1c9dc3-a822-49c7-9647-bcfc89bac06f", 
        SpecializationId: "4A5C2B50-A4E4-4781-BA15-1B0078041D7E", 
        DoctorClinicId: clinic.id, 
        AppointmentAtClinicId: selectedAppointmentId, 
        MedicalCondition: "Initial Checkup", 
        TotalPrice: clinic.price 
      };

      await createAppointment(bookingPayload);

      Swal.fire({
        title: 'Booked Successfully!',
        text: 'Your appointment has been registered.',
        icon: 'success',
        confirmButtonColor: '#0d9488'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/MyAppointments'); 
        }
      });

    } catch (error) {
      console.error("Booking failed:", error);
      Swal.fire({
        title: 'Booking Failed',
        text: 'Something went wrong, please try again.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setBookingLoading(false);
    }
  };

  const formatDay = (day) => day ? day.charAt(0).toUpperCase() + day.slice(1) : "";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate("/clinics")}
          className="mb-6 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Clinics
        </button>

        {!loading && clinic && (
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 text-[11px] font-semibold rounded-full uppercase tracking-wider">
                    Clinic Details
                  </span>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1.5">
                    {clinic.clinicName}
                  </h1>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 mt-6 pt-2 divide-y divide-slate-100 dark:divide-slate-800">
                <DetailRow icon={Globe} label="Governorate" value={clinic.governorate || "Not specified"} />
                <DetailRow icon={MapPin} label="City & Area" value={`${clinic.city}, ${clinic.area}`} />
                <DetailRow icon={Signpost} label="Street" value={clinic.street} />
                <DetailRow icon={Phone} label="Phone Number" value={clinic.phone} />
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Available Appointment Times:
                  </h3>
                </div>

                <div className="relative group">
                  <select
                    value={selectedAppointmentId}
                    onChange={(e) => setSelectedAppointmentId(e.target.value)}
                    className="w-full h-14 pl-5 pr-12 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer appearance-none"
                  >
                    <option value="" disabled className="text-slate-400">Choose a time slot...</option>
                    {appointments.map((app) => (
                      <option 
                        key={app.id} 
                        value={app.id}
                        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-2"
                      >
                        {formatDay(app.day)} ({app.openAt?.substring(0, 5)} - {app.closedAt?.substring(0, 5)})
                      </option>
                    ))}
                  </select>
                  
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-teal-500 transition-colors">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-slate-50 dark:bg-teal-500/5 border border-slate-100 dark:border-teal-500/20 rounded-2xl flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Session Price
                </span>
                <div className="text-right">
                   <span className="text-3xl font-black text-teal-700 dark:text-teal-400">
                    {clinic.price}
                  </span>
                  <span className="ml-1 text-sm font-bold text-teal-600 dark:text-teal-500 opacity-80">EGP</span>
                </div>
              </div>

              <Button 
                onClick={handleBookAppointment}
                disabled={bookingLoading}
                className="w-full mt-8 rounded-2xl h-14 text-base font-bold shadow-lg shadow-teal-500/10 bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-950 hover:bg-teal-600 dark:hover:bg-teal-400 transition-all active:scale-[0.98]"
              >
                {bookingLoading ? "Processing..." : "Confirm & Book Now"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default ClinicDetails;