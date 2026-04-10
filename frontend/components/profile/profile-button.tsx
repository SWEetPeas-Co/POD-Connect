// This component is used in profile to go to sub tabs

import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, Href } from "expo-router";

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

import { ArrowRight } from "lucide-react-native";

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeContext } from "@/src/lib/themeContext/theme-context";

type ProfileButtonProps = {
  option: string
  href: Href
}

export default function ProfileButton({option, href}:ProfileButtonProps) {
  //const colorScheme = useColorScheme();
  //const theme = Colors[colorScheme ?? 'light'];
  const { mode } = useThemeContext();
  const theme = Colors[mode];
  
  const router = useRouter();
  
  return (
    <TouchableOpacity style={{ width: '100%' }} onPress={() => router.push(href)} activeOpacity={0.7} >

      <ThemedView style={[styles.button, {shadowColor: theme.eventCardDropShadow, shadowRadius: 1,shadowOffset: { width: 3, height: 4 },},]}>

        <ThemedText type="eventTitle">{option}</ThemedText>

        <ArrowRight size={20} color={theme.eventCardText} />
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 15,
    padding: 18,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});