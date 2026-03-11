// This star button favorites a club, for now, it does nothing

import { Pressable } from "react-native";
import { Star } from "lucide-react-native";

type FilterButtonProps = {
  onPress: () => void;
  active: boolean;
  style?: object;
}

export default function StarButton({ active, onPress, style }: FilterButtonProps) {

  return (
    <Pressable onPress={onPress} style={style}>
      <Star
        size={20}
        color={active ? "#CCB423" : "#D4CEAB"}
        fill={active ? "#CCB423" : "none"}
      />
    </Pressable>
  );

}