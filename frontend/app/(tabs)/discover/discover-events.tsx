// This is a subtab not in navbar, but accessed through slider in discover-clubs

import { StyleSheet, ScrollView } from "react-native";
import { useState, useContext, useEffect } from "react";
import RsvpContext from "@/src/lib/rsvpContext/rsvpContext";
import { useFavorites } from '@/src/lib/favoritesContext/favoritesContext';
import { parseEventTime } from '@/utils/parse-event-time';
import { getEvents, getClubs } from '@/src/lib/api';

import DiscoverEventCard from "@/components/events/discover-event-card";
import Header from "@/components/header";
import Slider from "@/components/ui/slider";
import SearchBar from "@/components/ui/search-bar";
import { ThemedView } from "@/components/themed-view";

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Event = {
  id: number;
  title: string;
  clubId: number;
  location: string;
  time: string;
  description: string;
  tags: string[];
  headcount: number;
}

type Club = {
  id: number;
  club: string;
  tags: string[];
  headcount: number;
  description: string;
}

export default function DiscoverEvents() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const { rsvpIds, toggleRSVP } = useContext(RsvpContext);
  const { favoriteIds, toggleFavorite } = useFavorites();

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

  const filteredEvents = events
    .filter((event) => event.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => parseEventTime(a.time).getTime() - parseEventTime(b.time).getTime());

  return (
    <ThemedView style={[styles.mainContainer, { backgroundColor: theme.background }]}>

      <Header title="DISCOVER" />

      <ThemedView style={styles.searchContainer}>
        <Slider />
        <ThemedView style={styles.searchRow}>
          <SearchBar value={search} onChangeText={setSearch} />
        </ThemedView>
      </ThemedView>

      <ScrollView style={styles.eventContainer} contentContainerStyle={styles.eventContent}>
        {filteredEvents.map((event) => {
          const club = clubs.find(c => c.id === event.clubId);
          return (
            <DiscoverEventCard
              key={event.id}
              id={event.id}
              clubId={event.clubId}
              club={club?.club ?? "Unknown Club"}
              rsvped={rsvpIds.includes(event.id)}
              onToggleRSVP={toggleRSVP}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
              title={event.title}
              location={event.location}
              time={event.time}
              description={event.description}
              headcount={event.headcount + (rsvpIds.includes(event.id) ? 1 : 0)}
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
    height: 85,
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