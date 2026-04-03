// This makes a standard button, used in login screen

import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type PrimaryButtonProps = {
  title: string
  onPress: () => void
}

export default function PrimaryButton({ title, onPress }: PrimaryButtonProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  return (
    <Pressable style={[styles.button, {backgroundColor: theme.logOutButtonBackgroundDefault }]} onPress={onPress}>
      <ThemedText type="eventSubtitle" style={{color: theme.logOutButtonTextDefult }}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
});