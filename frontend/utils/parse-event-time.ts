// utils/parseEventTime.ts
export function parseEventTime(timeStr: string): Date {
  // Example input: "Fri, 09/08, 6:00 pm"
  const [weekday, datePart, timePart] = timeStr.split(", ").map(s => s.trim()); 
  // datePart = "09/08", timePart = "6:00 pm"

  const [monthStr, dayStr] = datePart.split("/"); // ["09","08"]
  const month = parseInt(monthStr, 10) - 1; // JS months 0-indexed
  const day = parseInt(dayStr, 10);

  let [hoursStr, minutesStrPart] = timePart.split(":"); // ["6", "00 pm"]
  let [minutesStr, ampm] = minutesStrPart.split(" "); // ["00","pm"]

  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  if (ampm.toLowerCase() === "pm" && hours !== 12) hours += 12;
  if (ampm.toLowerCase() === "am" && hours === 12) hours = 0;

  // Use current year
  const now = new Date();
  const year = now.getFullYear();

  return new Date(year, month, day, hours, minutes);
}