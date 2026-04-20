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
import { auth } from "@/src/lib/firebase";

type Club = {
  id: string;
  club: string;
  tags: string[];
  headcount: number;
  description: string;
  image: string;
  admins: string[]; // List of user IDs who are admins of the club
  members: string[]; // List of user IDs who are members of the club
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
  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false);


  const handleAddEvent = (club: Club) => {
    setAddEventClub(club);
    setAddEventVisible(true);
  };

  useEffect(() => {
    async function fetchClubs() {
      try {
        const data = await getClubs();
        const user = auth.currentUser;

        // 1. Fetch the user document
        const userDoc = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/users/${user?.uid}`
        ).then(res => res.json());

        const isGlobalAdmin = userDoc.isAdmin === true;
        setIsGlobalAdmin(userDoc.isAdmin === true);


        // 2. Map _id → id
        const mapped = data.map((club: any) => ({
          ...club,
          id: club._id.toString()
        }));

        // 3. If global admin → show ALL clubs
        if (isGlobalAdmin) {
          setClubs(mapped);
          return;
        }

        // 4. Otherwise → show only clubs where user is a club admin
        const owned = mapped.filter((club: Club) =>
          club.admins?.includes(user?.uid ?? "")
        );

        setClubs(owned);

      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchClubs();
  }, []);

  const handleDeleteClub = async (club: Club) => {
    try {
      await fetch(`${process.env.EXPO_PUBLIC_API_URL}/clubs/${club.id}`, {
        method: "DELETE",
      });

      setClubs(prev => prev.filter(c => c.id !== club.id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

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
        <ThemedView style={[styles.infoContainer, { backgroundColor: theme.eventCardBackground, shadowColor: theme.eventCardDropShadow, shadowRadius: 1, shadowOffset: { width: 3, height: 4 } }]}>
          <ThemedText type="eventTitle">My Clubs</ThemedText>
          <ThemedText>List of created clubs.</ThemedText>
        </ThemedView>
      </ThemedView>

      <ScrollView style={styles.eventContainer} contentContainerStyle={styles.eventContent}>
        

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
              description={club.description}
              onEdit={() => handleEdit(club)}
              onAddEvent={() => handleAddEvent(club)}
              members={club.members}
              onDelete={() => handleDeleteClub(club)} 
              isGlobalAdmin={isGlobalAdmin}
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
      {addEventClub && (
        <CreateEventModal
          visible={addEventVisible}
          onClose={() => setAddEventVisible(false)}
          clubId={addEventClub.id}
          clubImage={addEventClub.image}
        />
      )}


    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, paddingTop: 85, gap: 20 },
  backContainer: { width: '100%', justifyContent: 'center', alignItems: 'center', gap: 15, paddingHorizontal: 50, backgroundColor: 'transparent' },
  eventContainer: { flex: 1, width: '100%' },
  eventContent: { alignItems: 'center', gap: 15, paddingHorizontal: 16, paddingBottom: 100 },
  infoContainer: { width: '100%', borderRadius: 15, padding: 18, shadowRadius: 1, shadowOffset: { width: 3, height: 4 } },
  backButton: { flexDirection: "row", alignItems: "center", gap: 8, alignSelf: "flex-start" },
  createButton: { width: '100%', borderRadius: 15, padding: 18, alignItems: 'center', borderWidth: 1.5, borderStyle: 'dashed' },
});