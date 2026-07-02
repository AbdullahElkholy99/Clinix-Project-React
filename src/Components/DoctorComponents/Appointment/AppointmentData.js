export const DAYS = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export const MOCK_CLINICS = [
  {
    doctorClinicId: "1",
    clinicName: "Elite Clinic",
    address: "Nasr City",
  },
  {
    doctorClinicId: "2",
    clinicName: "Smart Clinic",
    address: "Maadi",
  },
  {
    doctorClinicId: "3",
    clinicName: "Care Clinic",
    address: "6th October",
  },
  {
    doctorClinicId: "4",
    clinicName: "Royal Clinic",
    address: "Dokki",
  },
  {
    doctorClinicId: "5",
    clinicName: "Smile Clinic",
    address: "Heliopolis",
  },
  {
    doctorClinicId: "6",
    clinicName: "Life Clinic",
    address: "Alexandria",
  },
];


export const generateTimeOptions = () => {
  const times = [];

  for (let hour = 8; hour <= 20; hour++) {
    ["00", "30"].forEach((minute) => {
      const date = new Date();
      date.setHours(hour);
      date.setMinutes(Number(minute));

      times.push(
        date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    });
  }

  return times;
};

export const TIME_OPTIONS = generateTimeOptions();