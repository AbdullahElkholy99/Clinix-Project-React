export const DAYS = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];



export const generateTimeOptions = () => {
  const times = [];

  for (let hour = 8; hour <= 20; hour++) {
    for (const minute of [0, 30]) {
      const date = new Date();
      date.setHours(hour, minute);

      const label = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const value = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}:00`;

      times.push({
        label,
        value,
      });
    }
  }

  return times;
};

export const TIME_OPTIONS = generateTimeOptions();