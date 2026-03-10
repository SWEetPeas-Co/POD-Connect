import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

type EventCardProps = {
  title: string
  subtitle: string
  location: string
  description: string
  headcount: number
}

export default function EventCard({
  title,
  subtitle,
  location,
  description,
  headcount,
}: EventCardProps) {

  return (
    <ThemedView style={styles.card}>

      <ThemedView style={styles.top}>

        <ThemedView style={styles.image} />

        <ThemedView style={styles.text}>
          <ThemedText type="eventTitle">{title}</ThemedText>
          <ThemedText type="eventSubtitle">{subtitle}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.rsvp}>
          <ThemedView style={styles.rsvpButton}>
            <ThemedText type="eventSubtitle">RSVP</ThemedText>
          </ThemedView>

          <ThemedText type="eventSubtitle">{headcount}</ThemedText>
        </ThemedView>

      </ThemedView>

      <ThemedView style={styles.middle}>
        <ThemedText type="eventSubtitle">{location}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.bottom}>
        <ThemedText type="eventDescription">{description}</ThemedText>
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
    height: 60,
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
    justifyContent: "center",
  },

  rsvp: {
    width: 90,
    alignItems: "flex-end",
    gap: 4,
  },

  rsvpButton: {
    height: 25,
    width: 90,
    backgroundColor: "#98BA7B",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  middle: {
    height: 30,
    justifyContent: "center",
  },

  bottom: {
    paddingTop: 5,
  },

});