import { useState, useEffect } from "react";
import { Modal, StyleSheet, TextInput, Pressable, ScrollView, ActivityIndicator, Alert } from "react-native";
import { X } from "lucide-react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useThemeContext } from "@/src/lib/themeContext/theme-context";

type Event = {
  _id: string;
  title: string;
  clubId: string;
  location: string;
  time: string;
  description: string;
  tags: string[];
  attendees: string[];
  headcount: number;
  image?: string;
};

export default function CreateEventModal({
  visible,
  onClose,
  event = null,
  clubImage,
  clubId,
}: {
  visible: boolean;
  onClose: () => void;
  event?: Event | null;
  clubImage: string;   // ← pass the club image from parent
  clubId: string;      // ← pass the clubId from parent
}) {
  const { mode } = useThemeContext();
  const theme = Colors[mode];

  const isEditing = event !== null;

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      if (event) {
        setEventName(event.title);
        setDescription(event.description);
        setLocation(event.location);
        setTime(event.time);
        setTags(event.tags);
      } else {
        setEventName("");
        setDescription("");
        setLocation("");
        setTime("");
        setTags([]);
        setTagInput("");
      }
    }
  }, [event, visible]);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags(prev => [...prev, trimmed]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleSubmit = async () => {
    if (!eventName.trim()) return;

    setLoading(true);

    try {
      const payload = {
        title: eventName,
        description,
        location,
        time,
        tags,
        clubId,
        attendees: event?.attendees || [],
        headcount: event?.headcount || 0,
        image: clubImage, // ← ALWAYS use club image
      };

      const url = isEditing
        ? `${process.env.EXPO_PUBLIC_API_URL}/events/${event?._id}`
        : `${process.env.EXPO_PUBLIC_API_URL}/events`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onClose();
      } else {
        const errorMsg = await response.text();
        Alert.alert("Error", `Server rejected request: ${errorMsg}`);
      }
    } catch (err) {
      console.error("Failed to save event:", err);
      Alert.alert("Network Error", "Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <ThemedView style={styles.overlay}>
        <ThemedView style={[styles.card, { backgroundColor: theme.eventCardBackground }]}>

          <ThemedView style={styles.cardHeader}>
            <ThemedText type="eventTitle">
              {isEditing ? "Edit Event" : "Create Event"}
            </ThemedText>
            <Pressable onPress={onClose} disabled={loading}>
              <X size={20} color={theme.eventCardText} />
            </Pressable>
          </ThemedView>

          <ScrollView showsVerticalScrollIndicator={false}>

            <ThemedText style={styles.label}>Event Name</ThemedText>
            <TextInput
              style={[styles.input, { color: theme.eventCardText, borderColor: theme.eventCardDropShadow }]}
              placeholder="e.g. Chess Tournament"
              placeholderTextColor={theme.eventCardDropShadow}
              value={eventName}
              onChangeText={setEventName}
            />

            <ThemedText style={styles.label}>Location</ThemedText>
            <TextInput
              style={[styles.input, { color: theme.eventCardText, borderColor: theme.eventCardDropShadow }]}
              placeholder="e.g. Reitz Union Room 2350"
              placeholderTextColor={theme.eventCardDropShadow}
              value={location}
              onChangeText={setLocation}
            />

            <ThemedText style={styles.label}>Time</ThemedText>
            <TextInput
              style={[styles.input, { color: theme.eventCardText, borderColor: theme.eventCardDropShadow }]}
              placeholder="e.g. Mon, 04/20, 5:30 pm"
              placeholderTextColor={theme.eventCardDropShadow}
              value={time}
              onChangeText={setTime}
            />

            <ThemedText style={styles.label}>Description</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea, { color: theme.eventCardText, borderColor: theme.eventCardDropShadow }]}
              placeholder="What is this event about?"
              placeholderTextColor={theme.eventCardDropShadow}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />

            <Pressable
              style={[styles.submitButton, { backgroundColor: theme.eventCardDropShadow, opacity: loading ? 0.7 : 1 }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={theme.background} />
              ) : (
                <ThemedText style={{ color: theme.logOutButtonTextDefult, fontWeight: "600" }}>
                  {isEditing ? "Save Changes" : "Create Event"}
                </ThemedText>
              )}
            </Pressable>

          </ScrollView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  card: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "85%",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  tagInputRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  tagInput: {
    flex: 1,
  },
  addTagButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  tag: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  tagText: {
    fontSize: 13,
  },
  submitButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 8,
  },
});
