// This creates a styled filter button only for discover-clubs

import { Pressable, StyleSheet } from "react-native";
import { SlidersHorizontal } from "lucide-react-native";

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type FilterButtonProps = {
  onPress: () => void
  active: boolean
}

export default function FilterButton({ onPress, active }: FilterButtonProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  return (
    <Pressable style={[styles.button, {backgroundColor: theme.filterButtonBackgroundDefault }, active && {backgroundColor: theme.filterButtonBackgroundSelected }]} onPress={onPress}>
      <SlidersHorizontal size={18} color={active ? theme.filterButtonIconDefault : theme.filterButtonIconSelected} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 35,
    width: 35,
   //backgroundColor: "#E6E1C3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {
    //backgroundColor: "#D4CEAB",
  },
});