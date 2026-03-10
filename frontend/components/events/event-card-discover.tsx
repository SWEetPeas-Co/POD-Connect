import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import Tag from "../ui/tag";

type DiscoverCardProps = {
  title: string
  tags: string[]
  headcount: number
}

export default function DiscoverEventCard({
  title,
  tags,
  headcount,
}: DiscoverCardProps) {

  return (
    <ThemedView style={styles.card}>

      <ThemedView style={styles.top}>

        <ThemedView style={styles.image} />

        <ThemedView style={styles.text}>
          <ThemedText type="eventTitle">{title}</ThemedText>

          <ThemedView style={styles.tags}>
            {tags.map((tag, i) => (
              <Tag key={i} label={tag} />
            ))}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.rsvp}>
          <ThemedText type="eventSubtitle">{headcount}</ThemedText>
          <ThemedView style={styles.star}/>
        </ThemedView>

      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({

  card: {
    width: "100%",
    backgroundColor: "#E6E1C3",
    borderRadius: 15,
    padding: 12,
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  image: {
    height: 60,
    width: 60,
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  text: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "space-between",
  },

  tags: {
    flexDirection: "row",
    gap: 10,
  },

  rsvp: {
    flexDirection: "row",
    gap: 10,
  },

  star: {
    height: 25,
    width: 25,
    backgroundColor: "#98BA7B",
    borderRadius: 10,
  },

});