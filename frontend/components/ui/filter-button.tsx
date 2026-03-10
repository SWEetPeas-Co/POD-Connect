import { Pressable, StyleSheet } from "react-native";
import { SlidersHorizontal } from "lucide-react-native";

type FilterButtonProps = {
  onPress: () => void
}

export default function FilterButton({ onPress }: FilterButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <SlidersHorizontal size={18} />
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
});