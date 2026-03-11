// This allows RSVP states to be shared btw files

import React, { createContext, useState } from "react";

type RsvpContextType = {
  rsvpIds: number[]
  toggleRSVP: (id: number) => void
}

const RsvpContext = createContext<RsvpContextType>({
  rsvpIds: [],
  toggleRSVP: () => {},
});

export function RsvpProvider({ children }: { children: React.ReactNode }) {
  const [rsvpIds, setRsvpIds] = useState<number[]>([]);

  function toggleRSVP(id: number) {
    setRsvpIds((prev) =>
      prev.includes(id)
        ? prev.filter((eventId) => eventId !== id)
        : [...prev, id]
    );
  }

  return (
    <RsvpContext.Provider value={{ rsvpIds, toggleRSVP }}>
      {children}
    </RsvpContext.Provider>
  );
}

export default RsvpContext;