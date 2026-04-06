// This is for preferences

import { StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import Header from "@/components/header";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import ColorModeSwitcher from "@/components/ui/color-switch-button";

export default function Preferences() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const router = useRouter();

//   const handleModeChange = (newMode: 'light' | 'dark' | 'colorblind') => {
//     console.log("Color mode changed to:", newMode);
//   };

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

            <ThemedText type="eventTitle">Preferences</ThemedText>
            <ThemedText> Change theme mode and other display settings. </ThemedText>

            <ThemedView style={styles.options}>
              <ThemedView style={styles.option}>
                <ThemedText type="eventTitle">Light/Dark Mode:</ThemedText>
              </ThemedView>
              <ThemedView style={styles.option}>
                <ThemedText type="eventTitle">Accessibility:</ThemedText>
              </ThemedView>
              <ThemedView style={styles.option}>
                <ThemedText type="eventTitle">Colorblindness:</ThemedText>
              </ThemedView>
              <ThemedView style={styles.option}>
                <ThemedText type="eventTitle">SFX:</ThemedText>
              </ThemedView>
            </ThemedView>
        
        </ThemedView>
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
  options: {
    marginVertical: 20,
    paddingHorizontal: 50,
    gap: 25,
  },
  option: {
    backgroundColor: 'transparent',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
});