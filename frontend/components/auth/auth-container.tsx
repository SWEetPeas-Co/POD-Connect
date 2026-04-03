import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type AuthLayoutProps = {
  title: string
  children: ReactNode
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ThemedText type="header" style={styles.title}>
        {title}
      </ThemedText>

      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 24,
    gap: 16,
  },

  title: {
    width: "100%",
    fontSize: 28,
    fontWeight: "500",
    justifyContent: "center",
    alignContent: "center",
  },
});