// This is a subtab not in navbar, but accessed through slider in discover-clubs

import { StyleSheet, ScrollView } from "react-native";
import { events } from "@/data/events";
import { useState, useContext } from "react";
import RsvpContext from "@/src/lib/rsvpContext/rsvpContext";
import { useFavorites } from '@/src/lib/favoritesContext/favoritesContext';
import { parseEventTime } from '@/utils/parse-event-time';

import DiscoverEventCard from "@/components/events/discover-event-card";
import Header from "@/components/header";
import Slider from "@/components/ui/slider";
import SearchBar from "@/components/ui/search-bar";
import { ThemedView } from "@/components/themed-view";

export default function DiscoverEvents() {
  const [search, setSearch] = useState("");
  const { rsvpIds, toggleRSVP } = useContext(RsvpContext);
  const { favoriteIds, toggleFavorite } = useFavorites();

  type Event = typeof events[number];

  const filteredEvents: Event[] = events
    .filter((event) => event.title.toLowerCase().includes(search.toLowerCase()) ) // search logic
    .sort((a: Event, b: Event) => parseEventTime(a.time).getTime() - parseEventTime(b.time).getTime());

  return (
    <ThemedView style={styles.mainContainer}>

      <Header title="DISCOVER" />

      <ThemedView style={styles.searchContainer}>
        <Slider />
        <ThemedView style={styles.searchRow}>
          <SearchBar value={search} onChangeText={setSearch} />
        </ThemedView>
      </ThemedView>

      <ScrollView style={styles.eventContainer} contentContainerStyle={styles.eventContent}>

        {filteredEvents.map((event) => (
          <DiscoverEventCard
            key={event.id}
            id={event.id}
            clubId={event.clubId}
            rsvped={rsvpIds.includes(event.id)}
            onToggleRSVP={toggleRSVP}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
            title={event.title}
            location={event.location}
            time={event.time}
            description={event.description}
            headcount={event.headcount}
          />
        ))}

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
    height: 85,
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
