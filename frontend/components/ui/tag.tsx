import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

type TagProps = {
  label: string
}

export default function Tag({ label }: TagProps) {

  return (
    <ThemedView style={styles.tag}>
      <ThemedText type="eventTag">{label}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: "#98BA7B",
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});