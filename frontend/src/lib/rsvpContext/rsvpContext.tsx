import React, { createContext, useState } from "react";

type RsvpContextType = {
  rsvpIds: string[];
  toggleRSVP: (eventId: string, userId: string) => Promise<void>;
};

const RsvpContext = createContext<RsvpContextType>({
  rsvpIds: [],
  toggleRSVP: async () => {},
});

export function RsvpProvider({ children }: { children: React.ReactNode }) {
  const [rsvpIds, setRsvpIds] = useState<string[]>([]);

  async function toggleRSVP(eventId: string, userId: string) {
    const isRsvped = rsvpIds.includes(eventId);

    try {
      const endpoint = isRsvped ? "leave" : "join";

      await fetch(`${process.env.EXPO_PUBLIC_API_URL}/events/${eventId}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      // Update local state AFTER backend succeeds
      setRsvpIds((prev) =>
        isRsvped
          ? prev.filter((id) => id !== eventId)
          : [...prev, eventId]
      );

    } catch (err) {
      console.error("RSVP error:", err);
    }
  }

  return (
    <RsvpContext.Provider value={{ rsvpIds, toggleRSVP }}>
      {children}
    </RsvpContext.Provider>
  );
}

export default RsvpContext;
