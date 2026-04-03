// This document outlines the second tab: the Discover Clubs tab
// Has a slider, but should be the default tab

import { StyleSheet, ScrollView, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { useFavorites } from '@/src/lib/favoritesContext/favoritesContext';
import { getClubs } from '@/src/lib/api';

import DiscoverClubCard from "@/components/events/discover-club-card";
import Header from "@/components/header";
import Slider from "@/components/ui/slider";
import SearchBar from "@/components/ui/search-bar";
import FilterButton from "@/components/ui/filter-button";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Club = {
  id: number;
  club: string;
  tags: string[];
  headcount: number;
  description: string;
  image: string;
}

export default function DiscoverClubs() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    const [search, setSearch] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [clubs, setClubs] = useState<Club[]>([]);
    const { favoriteIds, toggleFavorite } = useFavorites();

    useEffect(() => {
        async function fetchClubs() {
            try {
                const data = await getClubs();
                setClubs(data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        }
        fetchClubs();
    }, []);

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

    // creates a unique list of all tags used by clubs
    const allTags = Array.from(
        new Set(clubs.flatMap((club) => club.tags))
    );

    // filtering logic
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
    <ThemedView style={[styles.mainContainer, { backgroundColor: theme.background }]}>

      <Header title="DISCOVER CLUBS" />

      <ThemedView style={styles.searchContainer}>
        <Slider />

        <ThemedView style={styles.searchRow}>
            <SearchBar value={search} onChangeText={setSearch} />
            <FilterButton onPress={toggleFilters} active={showFilters} />
        </ThemedView>

        {showFilters && (
          <ThemedView style={styles.filterContainer}>
            {allTags.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <Pressable
                  key={tag}
                  style={[styles.tag, { backgroundColor: theme.filterTagBackgroundDefault }, active && { backgroundColor: theme.filterTagBackgroundSelected }]}
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
            <DiscoverClubCard
                key={club.id}
                id={club.id}
                title={club.club}
                tags={club.tags}
                headcount={club.headcount + (favoriteIds.includes(club.id) ? 1 : 0)}
                image={club.image}
                active={favoriteIds.includes(club.id)}
                onToggle={() => toggleFavorite(club.id)}
            />
        ))}
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
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    width: "100%",
    backgroundColor: 'transparent',
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagActive: {},
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