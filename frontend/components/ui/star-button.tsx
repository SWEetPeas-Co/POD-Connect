import { Pressable } from "react-native";
import { Star } from "lucide-react-native";

type FilterButtonProps = {
  onPress: () => void;
  active: boolean;
}

export default function StarButton({ active, onPress }: FilterButtonProps) {

  return (
    <Pressable onPress={onPress}>
      <Star
        size={20}
        color={active ? "#FFD700" : "#CBBF9D"}
        fill={active ? "#FFD700" : "none"}
      />
    </Pressable>
  );

}