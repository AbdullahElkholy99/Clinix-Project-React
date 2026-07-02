import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

// import bookingData from "./bookingData";
import BookingStats from "./BookingStats";
import BookingFilters from "./BookingFilters";
import BookingCard from "./BookingCard";
import BookingModal from "./BookingModal";
import { useEffect } from "react";
import { getAllBooking,cancelBooking,confrimBooking } from "../Services/doctorBooking";
import { getAllClinics } from "../Services/clinic-service";

export default function DoctorBooking() {
  const [bookings, setBookings] = useState([]);
  // Clinics List
  const [clinics, setClinics] = useState([]);

  //done 
  useEffect(() => {
    // Fetch bookings from API
    const fetchBookings = async () => {
      const response = await getAllBooking();
      console.log("Bookings:", response);
      setBookings(response);
    };
    const fetchClinics = async () => {
      const response = await getAllClinics();
      setClinics(response);
      console.log("Clinics:", response);
    };

    fetchBookings();
    fetchClinics();
  }, []);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [clinic, setClinic] = useState("");

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Filter --- done
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch = booking.patientName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === "" ? true : booking.isAccepted === (status === "true");

      const matchesClinic = true;
      // clinic === "" || booking.clinicName === clinic;

      return matchesSearch && matchesStatus && matchesClinic;
    });
  }, [bookings, search, status, clinic]);
  
  // Confirm
  const handleConfirm = async (id) => {
     const response = await confrimBooking();

    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              isAccepted: true,
            }
          : b,
      ),
    );

    setSelectedBooking((prev) =>
      prev
        ? {
            ...prev,
              isAccepted: true,
          }
        : null,
    );
  };

  // Cancel
  const handleCancel = async (id) => {
     const response = await cancelBooking();

    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              isAccepted: false,
            }
          : b,
      ),
    );

    setSelectedBooking((prev) =>
      prev
        ? {
            ...prev,
              isAccepted: false,
          }
        : null,
    );
  };

  // Open Modal
  const handleView = (booking) => {
    setSelectedBooking(booking);
    setOpenModal(true);
  };

  // Clear Filters -- done
  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setClinic("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-11/12 px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Manage Appointments
            </h1>

            <p className="mt-2 text-slate-500">
              Manage patient bookings across your clinics.
            </p>
          </div>

          <div className="rounded-2xl bg-blue-600 px-5 py-4 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <CalendarDays />

              <div>
                <p className="text-xs text-blue-100">Today's Bookings</p>

                <h3 className="text-2xl font-bold">{bookings.length}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}

        <BookingStats bookings={bookings} />

        {/* Filters */}

        <BookingFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          clinic={clinic}
          setClinic={setClinic}
          clinics={clinics}
          onClear={clearFilters}
        />

        {/* Booking Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              onView={handleView}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <CalendarDays size={56} className="mx-auto mb-4 text-slate-300" />

            <h2 className="text-2xl font-bold text-slate-700">
              No Appointments Found
            </h2>

            <p className="mt-2 text-slate-500">
              No appointments match your current filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Appointment Details Modal */}
        <BookingModal
          open={openModal}
          booking={selectedBooking}
          onClose={() => {
            setOpenModal(false);
            setSelectedBooking(null);
          }}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
