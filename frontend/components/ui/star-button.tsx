// This star button favorites a club, for now, it does nothing

import { Pressable } from "react-native";
import { Star } from "lucide-react-native";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeContext } from "@/src/lib/themeContext/theme-context";

type FilterButtonProps = {
  onPress: () => void;
  active: boolean;
  style?: object;
}

export default function StarButton({ active, onPress, style }: FilterButtonProps) {
  //const colorScheme = useColorScheme();
  //const theme = Colors[colorScheme ?? 'light'];
  const { mode } = useThemeContext();
  const theme = Colors[mode];

  return (
    <Pressable onPress={onPress} style={style}>
      <Star
        size={20}
        color={active ? theme.eventCardStarSelected : theme.eventCardStarDeselected}
        fill={active ? theme.eventCardStarSelected : "none"}
      />
    </Pressable>
  );

}