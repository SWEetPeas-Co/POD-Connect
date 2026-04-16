// This document outlines the first tab for RSVP'd events

import { StyleSheet, ScrollView } from "react-native";
import { useState, useContext, useEffect } from "react";
import RsvpContext from "@/src/lib/rsvpContext/rsvpContext";
import { getEvents, getClubs } from '@/src/lib/api';

import EventCard from "@/components/events/event-card";
import Header from "@/components/header";
import SearchBar from "@/components/ui/search-bar";
import { ThemedView } from "@/components/themed-view";
import { parseEventTime } from '@/utils/parse-event-time';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeContext } from "@/src/lib/themeContext/theme-context";

type Event = {
  _id: string;
  title: string;
  clubId: string;
  location: string;
  time: string;
  description: string;
  tags: string[];
  attendees: string[]; // List of user IDs who have RSVP'd
  headcount: number;
}

type Club = {
  _id: string;
  club: string;
  tags: string[];
  headcount: number;
  description: string;
  image: string;
}

export default function MyEvents() {
  //const colorScheme = useColorScheme();
  //const theme = Colors[colorScheme ?? 'light'];
  const { mode } = useThemeContext();
  const theme = Colors[mode];
  console.log('current mode:', mode);
  
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const { rsvpIds, toggleRSVP } = useContext(RsvpContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const [eventsData, clubsData] = await Promise.all([
          getEvents(),
          getClubs(),
        ]);
        setEvents(eventsData);
        setClubs(clubsData);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("clubs:", clubs.map(c => ({ id: c._id, name: c.club })));
    console.log("events:", events.map(e => ({ id: e._id, clubId: e.clubId })));
}, [clubs, events]);

  const filteredEvents = events
    .filter((event) => rsvpIds.includes(event._id))
    .filter((event) => event.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => parseEventTime(a.time).getTime() - parseEventTime(b.time).getTime());

  return (
    <ThemedView style={[styles.mainContainer, { backgroundColor: theme.background }]}>

      <Header title="MY EVENTS" />

      <ThemedView style={styles.searchContainer}>
        <ThemedView style={styles.searchRow}>
          <SearchBar value={search} onChangeText={setSearch} />
        </ThemedView>
      </ThemedView>

      <ScrollView style={styles.eventContainer} contentContainerStyle={styles.eventContent}>
        {filteredEvents.map((event) => {
          const club = clubs.find(c => c._id === event.clubId);
          return (
            <EventCard
              key={event._id}
              id={event._id}
              rsvped={rsvpIds.includes(event._id)}
              onToggleRSVP={() => toggleRSVP(event._id, user.uid)}
              title={event.title}
              club={club?.club ?? "Unknown Club"}
              image={club?.image ?? "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"}
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
    paddingTop: 85,
    gap: 15,
  },
  searchContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
  },
  searchRow: {
    flexDirection: "row",
    gap: 10,
    width: '100%',
    backgroundColor: 'transparent',
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