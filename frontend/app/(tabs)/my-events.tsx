// This document outlines the first tab for RSVP'd events

import { StyleSheet, ScrollView } from "react-native";
import { events } from "@/data/events";
import { useState, useContext } from "react";
import RsvpContext from "@/src/lib/rsvpContext/rsvpContext";

import EventCard from "@/components/events/event-card";
import Header from "@/components/header";
import SearchBar from "@/components/ui/search-bar";
import { ThemedView } from "@/components/themed-view";
import { clubs } from "@/data/clubs";

export default function MyEvents() {
  const [search, setSearch] = useState("");
const { rsvpIds, toggleRSVP } = useContext(RsvpContext);

  // only show search and if rsvp'd
  const filteredEvents = events
    .filter((event) => rsvpIds.includes(event.id))
    .filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) // only show if searched
  );

  return (
    <ThemedView style={styles.mainContainer}>

      <Header title="MY EVENTS" />

      <ThemedView style={styles.searchContainer}>
        <ThemedView style={styles.searchRow}>
          <SearchBar value={search} onChangeText={setSearch} />
        </ThemedView>
      </ThemedView>

      <ScrollView style={styles.eventContainer} contentContainerStyle={styles.eventContent}>

        {filteredEvents.map((event) => {
        const club = clubs.find(c => c.id === event.clubId);

        return (
          <EventCard
            key={event.id}
            id={event.id}
            rsvped={rsvpIds.includes(event.id)}
            onToggleRSVP={toggleRSVP}
            title={event.title}
            club={club?.club ?? "Unknown Club"} // <-- use the club name here
            location={event.location}
            time={event.time}
            description={event.description}
            headcount={event.headcount}
          />
        );
      })}

      </ScrollView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#98BA7B',
    paddingTop: 85,
    gap: 15,
  },
  searchContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 30,
  },
  searchRow: {
    flexDirection: "row",
    gap: 10,
    width: '100%',
  },
  eventContainer: {
    flex: 1,
    width: '100%',
  },
  eventContent: {
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
});