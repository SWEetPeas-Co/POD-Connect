// This is for list of created clubs, for leader users

import { StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState, useEffect } from "react";

import Header from "@/components/header";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from '@/constants/theme';
import { useThemeContext } from "@/src/lib/themeContext/theme-context";
import ProfileMyClubCard from "@/components/events/profile-my-club-card";
import CreateClubModal from "@/app/create-club-modal";
import CreateEventModal from "@/app/create-event-modal";
import { getClubs } from '@/src/lib/api';

type Club = {
  id: number;
  club: string;
  tags: string[];
  headcount: number;
  description: string;
  image: string;
};

export default function MyClubs() {
  const { mode } = useThemeContext();
  const theme = Colors[mode];
  const router = useRouter();

  const [clubs, setClubs] = useState<Club[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  const [addEventClub, setAddEventClub] = useState<Club | null>(null);
  const [addEventVisible, setAddEventVisible] = useState(false);

  const handleAddEvent = (club: Club) => {
    setAddEventClub(club);
    setAddEventVisible(true);
  };

  useEffect(() => {
    async function fetchClubs() {
      try {
        const data = await getClubs();
        // TODO: filter to only clubs owned by this user once backend supports it
        setClubs(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchClubs();
  }, []);

  const handleEdit = (club: Club) => {
    setSelectedClub(club);
    setIsVisible(true);
  };


  return (
    <ThemedView style={[styles.mainContainer, { backgroundColor: theme.background }]}>

      <Header title="PROFILE" />

      <ThemedView style={styles.backContainer}>
        <Pressable style={styles.backButton} onPress={() => router.push('../profile')}>
          <ArrowLeft size={20} color={theme.eventCardText} />
          <ThemedText type="eventSubtitle">Main Menu</ThemedText>
        </Pressable>
      </ThemedView>

      <ScrollView style={styles.eventContainer} contentContainerStyle={styles.eventContent}>
        <ThemedView style={[styles.infoContainer, { backgroundColor: theme.eventCardBackground, shadowColor: theme.eventCardDropShadow, shadowRadius: 1, shadowOffset: { width: 3, height: 4 } }]}>
          <ThemedText type="eventTitle">My Clubs</ThemedText>
          <ThemedText>List of created clubs.</ThemedText>
        </ThemedView>

        {clubs.length === 0 ? (
          <ThemedText>No clubs yet.</ThemedText>
        ) : (
          clubs.map((club) => (
            <ProfileMyClubCard
              key={club.id}
              id={club.id}
              title={club.club}
              tags={club.tags}
              headcount={club.headcount}
              image={club.image}
              onEdit={() => handleEdit(club)}
              onAddEvent={() => handleAddEvent(club)}
            />
          ))
        )}

        {/* Create new club button */}
        <Pressable
          onPress={() => { setSelectedClub(null); setIsVisible(true); }}
          style={[styles.createButton, { borderColor: theme.eventCardDropShadow }]}
        >
          <ThemedText type="eventTitle">+ Create Club</ThemedText>
        </Pressable>
      </ScrollView>

      <CreateClubModal
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        club={selectedClub}
      />
      <CreateEventModal
        visible={addEventVisible}
        onClose={() => setAddEventVisible(false)}
      />

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, paddingTop: 85, gap: 15 },
  backContainer: { width: '100%', justifyContent: 'center', alignItems: 'center', gap: 15, paddingHorizontal: 50, backgroundColor: 'transparent' },
  eventContainer: { flex: 1, width: '100%' },
  eventContent: { alignItems: 'center', gap: 15, paddingHorizontal: 50, paddingBottom: 100 },
  infoContainer: { width: '100%', borderRadius: 15, padding: 20, gap: 10, shadowRadius: 1, shadowOffset: { width: 3, height: 4 } },
  backButton: { flexDirection: "row", alignItems: "center", gap: 8, alignSelf: "flex-start" },
  createButton: { width: '100%', borderRadius: 15, padding: 18, alignItems: 'center', borderWidth: 1.5, borderStyle: 'dashed' },
});