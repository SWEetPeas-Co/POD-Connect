// This creates a styled filter button only for discover-clubs

import { Pressable, StyleSheet } from "react-native";
import { SlidersHorizontal } from "lucide-react-native";

type FilterButtonProps = {
  onPress: () => void
  active: boolean
}

export default function FilterButton({ onPress, active }: FilterButtonProps) {
  return (
    <Pressable style={[styles.button, active && styles.buttonActive]} onPress={onPress}>
      <SlidersHorizontal size={18} color={active ? "#569170" : "#4A7E61"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 35,
    width: 35,
    backgroundColor: "#E6E1C3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#D4CEAB",
  },
});