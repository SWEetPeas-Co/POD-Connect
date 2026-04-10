// This is for list of created clubs, for leader users

import { StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import Header from "@/components/header";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import ProfileButton from "@/components/profile/profile-button";
import { useState } from "react";
import CreateClubModal from "@/app/create-club-modal";
import { useThemeContext } from "@/src/lib/themeContext/theme-context";

export default function MyClubs() {
  //const colorScheme = useColorScheme();
  //const theme = Colors[colorScheme ?? 'light'];
  const { mode } = useThemeContext();
  const theme = Colors[mode];
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);


  return (
    <ThemedView style={[styles.mainContainer, { backgroundColor: theme.background } ]}>
        
        <Header title="PROFILE" />
        
        <ThemedView style={styles.backContainer}>
            <Pressable style={styles.backButton} onPress={() => router.push('../profile')} >
                <ArrowLeft size={20} color={theme.eventCardText} />
                <ThemedText type="eventSubtitle">Main Menu</ThemedText>
            </Pressable>
        </ThemedView>

      <ScrollView style={styles.eventContainer} contentContainerStyle={styles.eventContent}>
        <ThemedView style={[styles.infoContainer, {backgroundColor: theme.eventCardBackground, shadowColor: theme.eventCardDropShadow, shadowRadius: 1,shadowOffset: { width: 3, height: 4 },},]}>

            <ThemedText type="eventTitle">My Clubs</ThemedText>
            <ThemedText> List of created clubs. </ThemedText>
        
        </ThemedView>
        <Pressable onPress={() => setIsVisible(true)}>
          <ThemedText>TMODAL EXAMPLE TEST</ThemedText>
        </Pressable>
      </ScrollView>
      <CreateClubModal visible={isVisible} onClose={() => setIsVisible(false)} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 85,
    gap: 15,
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
    paddingHorizontal: 50,
    paddingBottom: 100,
  },
  infoContainer: {
    width: '100%',
    borderRadius: 15,
    padding: 20,
    gap: 10,

    shadowRadius: 1,
    shadowOffset: { width: 3, height: 4 },
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
  },
});