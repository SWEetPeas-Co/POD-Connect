export function parseEventTime(timeStr: string | undefined | null): Date {
  // If missing, invalid, or not a string → return a fallback date
  if (!timeStr || typeof timeStr !== "string" || !timeStr.includes(",")) {
    return new Date(0); // or new Date(), or null if you prefer
  }

  try {
    const [weekday, datePart, timePart] = timeStr.split(", ").map(s => s.trim());

    if (!datePart || !timePart) return new Date(0);

    const [monthStr, dayStr] = datePart.split("/");
    const month = parseInt(monthStr, 10) - 1;
    const day = parseInt(dayStr, 10);

    let [hoursStr, minutesStrPart] = timePart.split(":");
    let [minutesStr, ampm] = minutesStrPart.split(" ");

    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (ampm.toLowerCase() === "pm" && hours !== 12) hours += 12;
    if (ampm.toLowerCase() === "am" && hours === 12) hours = 0;

    const year = new Date().getFullYear();
    return new Date(year, month, day, hours, minutes);
  } catch (err) {
    console.error("parseEventTime failed:", err);
    return new Date(0);
  }
}
