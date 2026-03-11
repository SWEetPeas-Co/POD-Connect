import { StyleSheet, ScrollView, Pressable } from "react-native";
import { clubs } from "@/data/clubs";
import { useState } from "react";

import DiscoverEventCard from "@/components/events/event-card-discover";
import Header from "@/components/header";
import Slider from "@/components/ui/slider";
import SearchBar from "@/components/ui/search-bar";
import FilterButton from "@/components/ui/filter-button";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export default function DiscoverClubs() {
    const [search, setSearch] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    function toggleFilters() {
        setShowFilters(!showFilters);
    }

    function toggleTag(tag: string) {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    const allTags = Array.from(
        new Set(clubs.flatMap((club) => club.tags))
    );

    const filteredClubs = clubs
        .filter((club) =>
            club.club.toLowerCase().includes(search.toLowerCase())
        )
        .filter((club) =>
            selectedTags.length === 0
                ? true
                : club.tags.some((tag) => selectedTags.includes(tag))
        );

  return (
    <ThemedView style={styles.mainContainer}>

      <Header title="DISCOVER CLUBS" />

      <ThemedView style={styles.searchContainer}>
        <Slider />
        <ThemedView style={styles.searchRow}>
            <SearchBar value={search} onChangeText={setSearch} />
            <FilterButton onPress={toggleFilters} />
        </ThemedView>
        {showFilters && (
          <ThemedView style={styles.filterContainer}>
            {allTags.map((tag) => {
              const active = selectedTags.includes(tag);

              return (
                <Pressable
                  key={tag}
                  style={[styles.tag, active && styles.tagActive]}
                  onPress={() => toggleTag(tag)}
                >
                  <ThemedText type="eventTag">{tag}</ThemedText>
                </Pressable>
              );
            })}
          </ThemedView>
        )}
      </ThemedView>

      <ScrollView style={styles.eventContainer} contentContainerStyle={styles.eventContent}>

        {filteredClubs.map((club) => (
            <DiscoverEventCard
                key={club.id}
                title={club.club}
                tags={club.tags}
                headcount={club.headcount}
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
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    width: "100%",
  },
  tag: {
    backgroundColor: "#E6E1C3",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  tagActive: {
    backgroundColor: "#98BA7B",
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