import { useState, useEffect } from "react";
import { Modal, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import { X } from "lucide-react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from '@/constants/theme';
import { useThemeContext } from "@/src/lib/themeContext/theme-context";

type Club = {
  _id: string;
  club: string;
  tags: string[];
  headcount: number;
  description: string;
  image: string;
};

export default function CreateClubModal({
  visible,
  onClose,
  club = null,
}: {
  visible: boolean;
  onClose: () => void;
  club?: Club | null;
}) {
  const { mode } = useThemeContext();
  const theme = Colors[mode];

  const isEditing = club !== null;

  const [clubName, setClubName] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  // Pre-fill when editing
  useEffect(() => {
    if (club) {
      setClubName(club.club);
      setDescription(club.description);
      setTags(club.tags);
    } else {
      setClubName('');
      setDescription('');
      setTags([]);
      setTagInput('');
    }
  }, [club, visible]);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags(prev => [...prev, trimmed]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleSubmit = async () => {
      if (!clubName.trim()) return;
      
      try {
          if (isEditing) {
              await fetch(`${process.env.EXPO_PUBLIC_API_URL}/clubs/${club._id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ club: clubName, description, tags }),
              });
          } else {
              await fetch(`${process.env.EXPO_PUBLIC_API_URL}/clubs`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ club: clubName, description, tags }),
              });
          }
          onClose();
      } catch (err) {
          console.error("Failed to save club:", err);
      }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <ThemedView style={styles.overlay}>
        <ThemedView style={[styles.card, { backgroundColor: theme.eventCardBackground }]}>

          <ThemedView style={styles.cardHeader}>
            <ThemedText type="eventTitle">{isEditing ? 'Edit Club' : 'Create Club'}</ThemedText>
            <Pressable onPress={onClose}>
              <X size={20} color={theme.eventCardText} />
            </Pressable>
          </ThemedView>

          <ScrollView showsVerticalScrollIndicator={false}>

            <ThemedText style={styles.label}>Club Name</ThemedText>
            <TextInput
              style={[styles.input, { color: theme.eventCardText, borderColor: theme.eventCardDropShadow }]}
              placeholder="e.g. Chess Club"
              placeholderTextColor={theme.eventCardDropShadow}
              value={clubName}
              onChangeText={setClubName}
            />

            <ThemedText style={styles.label}>Description</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea, { color: theme.eventCardText, borderColor: theme.eventCardDropShadow }]}
              placeholder="What is this club about?"
              placeholderTextColor={theme.eventCardDropShadow}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />

            <ThemedText style={styles.label}>Tags</ThemedText>
            <ThemedView style={styles.tagInputRow}>
              <TextInput
                style={[styles.input, styles.tagInput, { color: theme.eventCardText, borderColor: theme.eventCardDropShadow }]}
                placeholder="Add a tag"
                placeholderTextColor={theme.eventCardDropShadow}
                value={tagInput}
                onChangeText={setTagInput}
                onSubmitEditing={handleAddTag}
                returnKeyType="done"
              />
              <Pressable
                style={[styles.addTagButton, { backgroundColor: theme.eventCardDropShadow }]}
                onPress={handleAddTag}
              >
                <ThemedText style={{ color: theme.background }}>Add</ThemedText>
              </Pressable>
            </ThemedView>

            <ThemedView style={styles.tagsRow}>
              {tags.map((tag, i) => (
                <Pressable
                  key={i}
                  style={[styles.tag, { borderColor: theme.eventCardDropShadow }]}
                  onPress={() => handleRemoveTag(tag)}
                >
                  <ThemedText style={styles.tagText}>{tag}  ✕</ThemedText>
                </Pressable>
              ))}
            </ThemedView>

            <Pressable
              style={[styles.submitButton, { backgroundColor: theme.eventCardDropShadow }]}
              onPress={handleSubmit}
            >
              <ThemedText style={{ color: theme.background, fontWeight: '600' }}>
                {isEditing ? 'Save Changes' : 'Create Club'}
              </ThemedText>
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  card: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '85%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
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
    textAlignVertical: 'top',
  },
  tagInputRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
    backgroundColor: 'transparent',
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
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
});