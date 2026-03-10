import { StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/themed-text";

type RSVPButtonProps = {
  onPress?: () => void
}

export default function RSVPButton({ onPress }: RSVPButtonProps) {

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      <ThemedText type="eventSubtitle">
        RSVP
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({

  button: {
    height: 25,
    width: 90,
    backgroundColor: "#98BA7B",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  pressed: {
    opacity: 0.7,
  },

});