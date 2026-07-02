import { useEffect, useState } from "react";
import { toast } from "sonner";

import { GetUserId } from "@/Components/Account/Services/tokenService";

import {
  getDoctorClinics,
  createAppointment,
} from "./Services/appointmentService";

import AppointmentHeader from "./Components/AppointmentHeader";
import AppointmentForm from "./Components/AppointmentForm";
import ClinicGrid from "./Components/ClinicGrid";
import EmptyState from "./Components/EmptyState";

export default function DoctorAppointment() {
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);

  const [loadingClinics, setLoadingClinics] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(false);

  useEffect(() => {
    loadClinics();
  }, []);

  const loadClinics = async () => {
    try {
      setLoadingClinics(true);

      const doctorId = GetUserId();

      if (!doctorId) {
        toast.error("Doctor not found.");
        return;
      }

      const response = await getDoctorClinics(doctorId);

      setClinics(response.data || response);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to load clinics.");
    } finally {
      setLoadingClinics(false);
    }
  };

  const handleCreateAppointment = async (appointment) => {
    try {
      setLoadingCreate(true);

      await createAppointment(appointment);

      toast.success("Appointment created successfully.");

      setSelectedClinic(null);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create appointment.");
    } finally {
      setLoadingCreate(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 py-10 dark:bg-slate-950 transition-colors">

      <div className="mx-auto max-w-7xl px-6">

        <AppointmentHeader />

        {loadingClinics ? (
          <div className="flex items-center justify-center py-24 text-lg text-slate-500 dark:text-slate-400">
            Loading Clinics...
          </div>
        ) : clinics.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <ClinicGrid
              clinics={clinics}
              selectedClinic={selectedClinic}
              onSelectClinic={setSelectedClinic}
            />

            {selectedClinic && (
              <AppointmentForm
                selectedClinic={selectedClinic}
                loading={loadingCreate}
                onSubmit={handleCreateAppointment}
              />
            )}
          </>
        )}

      </div>

    </section>
  );
}




// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// // import { useParams } from "react-router-dom";
// // import {
// //   getDoctorClinics,
// //   createAppointment,
// // } from "./Services/appointmentService";

// import { MOCK_CLINICS } from "./AppointmentData";

// import AppointmentHeader from "./Components/AppointmentHeader";
// import AppointmentForm from "./Components/AppointmentForm";
// import ClinicGrid from "./Components/ClinicGrid";
// import EmptyState from "./Components/EmptyState";

// export default function DoctorAppointment() {
//   // const { id } = useParams();

//   const [clinics, setClinics] = useState([]);
//   const [selectedClinic, setSelectedClinic] = useState(null);

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setClinics(MOCK_CLINICS);
//   }, []);

//   /*
//   ===============================
//   API VERSION
//   ===============================

//   useEffect(() => {
//     loadClinics();
//   }, []);

//   const loadClinics = async () => {
//     try {
//       const response = await getDoctorClinics(id);
//       setClinics(response.data || response);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   */

//   const handleCreateAppointment = async (appointment) => {
//     try {
//       setLoading(true);

//       console.log("Appointment :", appointment);

//       /*
//       await createAppointment(appointment);
//       */

//       toast.success("Appointment created successfully.");

//       setSelectedClinic(null);
//     } catch (error) {
//       console.error(error);

//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="min-h-screen bg-slate-50 py-10">

//       <div className="mx-auto max-w-7xl px-6">

//         <AppointmentHeader />

//         {clinics.length === 0 ? (
//           <EmptyState />
//         ) : (
//           <>
//             <ClinicGrid
//               clinics={clinics}
//               selectedClinic={selectedClinic}
//               onSelectClinic={setSelectedClinic}
//             />

//             {selectedClinic && (
//               <AppointmentForm
//                 selectedClinic={selectedClinic}
//                 loading={loading}
//                 onSubmit={handleCreateAppointment}
//               />
//             )}
//           </>
//         )}

//       </div>

//     </section>
//   );
// }