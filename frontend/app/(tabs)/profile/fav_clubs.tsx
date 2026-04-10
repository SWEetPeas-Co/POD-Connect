// This is for list of fav clubs

import { StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import { useState, useEffect } from "react";
import { useFavorites } from '@/src/lib/favoritesContext/favoritesContext';
import { getClubs } from '@/src/lib/api';

import DiscoverClubCard from "@/components/events/discover-club-card";

import Header from "@/components/header";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeContext } from "@/src/lib/themeContext/theme-context";

type Club = {
  id: number;
  club: string;
  tags: string[];
  headcount: number;
  description: string;
  image: string;
};

export default function FavClubs() {
  //const colorScheme = useColorScheme();
  //const theme = Colors[colorScheme ?? 'light'];
  const { mode } = useThemeContext();
  const theme = Colors[mode];

  const router = useRouter();

  const [clubs, setClubs] = useState<Club[]>([]);
  const { favoriteIds, toggleFavorite } = useFavorites();
  const favoriteClubs = clubs.filter((club) =>
    favoriteIds.includes(club.id)
  );

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

  return (
    <ThemedView style={[styles.mainContainer, { backgroundColor: theme.background } ]}>
        
        <Header title="PROFILE" />
        
        <ThemedView style={styles.backContainer}>
            <Pressable style={styles.backButton} onPress={() => router.push('../profile')} >
                <ArrowLeft size={20} color={theme.eventCardText} />
                <ThemedText type="eventSubtitle">Main Menu</ThemedText>
            </Pressable>
            <ThemedView style={[styles.subHead, {shadowColor: theme.eventCardDropShadow, shadowRadius: 1,shadowOffset: { width: 3, height: 4 },},]}>
              <ThemedText type="eventTitle">FAV CLUBS</ThemedText>
            </ThemedView>
        </ThemedView>

      <ScrollView style={styles.eventContainer} contentContainerStyle={styles.eventContent}>
        {favoriteClubs.length === 0 ? (
          <ThemedText>No favorite clubs yet.</ThemedText>
        ) : (
          favoriteClubs.map((club) => (
            <DiscoverClubCard
              key={club.id}
              id={club.id}
              title={club.club}
              tags={club.tags}
              headcount={club.headcount}
              image={club.image}
              active={favoriteIds.includes(club.id)}
              onToggle={() => toggleFavorite(club.id)}
            />
          ))
        )}
      </ScrollView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 85,
    gap: 20,
  },
  subHead: {
    width: '100%',
    borderRadius: 15,
    padding: 18,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 50,
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
  infoContainer: {
    width: '100%',
    borderRadius: 15,
    padding: 20,
    gap: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
  },
});