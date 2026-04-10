// This component styles the slider

import { StyleSheet, Pressable } from 'react-native';
import { useRouter, usePathname } from "expo-router";
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeContext } from '@/src/lib/themeContext/theme-context';

export default function Slider() {
  //const colorScheme = useColorScheme();
  //const theme = Colors[colorScheme ?? 'light'];
  const { mode } = useThemeContext();
  const theme = Colors[mode];

  const router = useRouter();
  const pathname = usePathname();

  const eventsActive = pathname.includes("discover-events");

  return (
    <ThemedView style={[styles.sliderContainer, {backgroundColor: theme.sliderBackgroundDefault} ]}>
      <Pressable
        style={[styles.side, eventsActive && {backgroundColor: theme.sliderBackgroundSelected}]}
        onPress={() => router.push("/discover-clubs")}
      >
        <ThemedText type="sliderDefault">
          Clubs
        </ThemedText>
      </Pressable>

      <Pressable
        style={[styles.side, !eventsActive && {backgroundColor: theme.sliderBackgroundSelected}]}
        onPress={() => router.push("/discover/discover-events")}
      >
        <ThemedText type="sliderDefault">
          Events
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({

  sliderContainer: {
    flexDirection: "row",
    height: 35,
    width: '100%',
    //backgroundColor: '#D4CEAB',
    borderRadius: 20,
    overflow: "hidden",
  },
  side: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  active: {
    //backgroundColor: "#E6E1C3",
  },

});