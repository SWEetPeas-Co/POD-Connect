// This document outlines the second tab: the Discover Clubs tab
// Has a slider, but should be the default tab

import { StyleSheet, ScrollView, Pressable } from "react-native";
import { clubs } from "@/data/clubs";
import { useState } from "react";
import { useFavorites } from '@/src/lib/favoritesContext/favoritesContext';

import DiscoverClubCard from "@/components/events/discover-club-card";
import Header from "@/components/header";
import Slider from "@/components/ui/slider";
import SearchBar from "@/components/ui/search-bar";
import FilterButton from "@/components/ui/filter-button";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

// Defines a React component called DiscoverClubs, other files can import it
export default function DiscoverClubs() {
    const [search, setSearch] = useState(""); // creates a state variable called search, search = what user types, setSearch = func that updates it, "" = initial value
    const [showFilters, setShowFilters] = useState(false); // controls whether to show tag filter, showFilters = bool, setShowFilters = func that changes state, false = default
    const [selectedTags, setSelectedTags] = useState<string[]>([]); // stores tags selected by user in an array, [] = defualt no filter
    const { favoriteIds, toggleFavorite } = useFavorites();

    function toggleFilters() { // clicking button shows/unshows filters
        setShowFilters(!showFilters);
    }

    // tag selection logic
    function toggleTag(tag: string) { // func recieves tag name
        if (selectedTags.includes(tag)) { // checks if the tag exists in the array.
            setSelectedTags(selectedTags.filter((t) => t !== tag)); // if so, remove it
        } else {
            setSelectedTags([...selectedTags, tag]); // if not, add it
        }
    }

    // creates a unique list of all tags used by clubs
    const allTags = Array.from(
        new Set(clubs.flatMap((club) => club.tags)) // flatMap makes a signle array, Set removes dupes
    );

    // filtering logic
    const filteredClubs = clubs // start with all clubs
        .filter((club) =>
            club.club.toLowerCase().includes(search.toLowerCase()) // search logic
        )
        .filter((club) =>
            selectedTags.length === 0 // no tags selected
                ? true
                : club.tags.some((tag) => selectedTags.includes(tag)) // If no tags selected → show everything, Else → only show clubs matching selected tags
        );

  return (
    <ThemedView style={styles.mainContainer}>

      <Header title="DISCOVER CLUBS" />

      <ThemedView style={styles.searchContainer}>
        <Slider />

        <ThemedView style={styles.searchRow}>
            <SearchBar value={search} onChangeText={setSearch} />
            <FilterButton onPress={toggleFilters} active={showFilters} /> {/* pressing button toggles if visible */}
        </ThemedView>

        {showFilters && (
          <ThemedView style={styles.filterContainer}>
            {allTags.map((tag) => { {/* looks through all tags and creates buttons */}
              const active = selectedTags.includes(tag); {/* check which are active */}

              return (
                <Pressable
                  key={tag}
                  style={[styles.tag, active && styles.tagActive]}
                  onPress={() => toggleTag(tag)}
                > {/* if active, apply tagActive style */}
                  <ThemedText type="eventTag">{tag}</ThemedText> {/* creates a button */}
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
                headcount={club.headcount}
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
    backgroundColor: "#D4CEAB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  tagActive: {
    backgroundColor: "#EFD7DD",
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