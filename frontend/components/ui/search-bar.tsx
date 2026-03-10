import { StyleSheet, TextInput } from "react-native";
import { ThemedView } from "@/components/themed-view";

type SearchBarProps = {
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
}

export default function SearchBar({
  placeholder = "Search events...",
  value,
  onChangeText,
}: SearchBarProps) {

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({

  container: {
    height: 35,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  input: {
    fontSize: 14,
  },

});