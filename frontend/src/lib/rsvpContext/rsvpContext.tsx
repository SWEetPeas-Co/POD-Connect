import React, { createContext, useState, useEffect } from "react";
import { auth } from "@/src/lib/firebase";
import { getEvents } from "@/src/lib/api";

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

  // ⭐ Load RSVP state from backend on startup
  useEffect(() => {
    async function loadRsvps() {
      const user = auth.currentUser;
      if (!user) return;

      const events = await getEvents();
      const attending = events
        .filter((e: { attendees: string[]; }) => e.attendees?.includes(user.uid))
        .map((e: { _id: string; }) => e._id);

      setRsvpIds(attending);
    }

    loadRsvps();
  }, []);

  async function toggleRSVP(eventId: string, userId: string) {
    const isRsvped = rsvpIds.includes(eventId);

    try {
      const endpoint = isRsvped ? "leave" : "join";

      await fetch(`${process.env.EXPO_PUBLIC_API_URL}/events/${eventId}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      setRsvpIds(prev =>
        isRsvped
          ? prev.filter(id => id !== eventId)
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
