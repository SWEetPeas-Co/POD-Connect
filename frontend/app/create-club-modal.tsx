import { useState, useEffect, useContext } from "react";
import { Modal, StyleSheet, TextInput, Pressable, ScrollView, Image, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { X, Camera, Pencil } from "lucide-react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from '@/constants/theme';
import { useThemeContext } from "@/src/lib/themeContext/theme-context";
import AuthContext from '@/src/lib/authContext';
import { uploadClubImage } from '@/src/lib/uploadClubImage';

type Club = {
  id: string;
  club: string;
  tags: string[];
  headcount: number;
  description: string;
  image: string;
  admins: string[];
  members: string[];
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
  const { currentUser } = useContext(AuthContext);

  const isEditing = club !== null;

  const [clubName, setClubName] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      if (club) {
        setClubName(club.club);
        setDescription(club.description);
        setTags(club.tags);
        setPhotoUri(club.image || null);
      } else {
        setClubName('');
        setDescription('');
        setTags([]);
        setTagInput('');
        setPhotoUri(null);
      }
    }
  }, [club, visible]);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Camera roll access is required to upload photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

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

  const isLocalUri = (uri: string) =>
    uri.startsWith('file://') || uri.startsWith('blob:') || uri.startsWith('content://');

  const handleSubmit = async () => {
    if (!clubName.trim()) return;
    setLoading(true);

    try {
      let imageUrl = club?.image || '';

      if (photoUri && isLocalUri(photoUri)) {
        imageUrl = await uploadClubImage(photoUri, clubName);
        if (!imageUrl) {
          Alert.alert("Error", "Failed to upload image.");
          setLoading(false);
          return;
        }
      } else if (!photoUri) {
        imageUrl = club?.image || '';
      } else {
        // already a remote http URL (editing, image unchanged)
        imageUrl = photoUri;
      }

      if (isEditing) {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/clubs/${club.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            club: clubName,
            description,
            tags,
            image: imageUrl,
            headcount: Number(club?.headcount) || 1,
            admins: (club?.admins || []).filter(id => id !== null),
            members: (club?.members || []).filter(id => id !== null),
          }),
        });
        if (response.ok) {
          onClose();
        } else {
          const errorMsg = await response.text();
          Alert.alert("Error", `Server rejected request: ${errorMsg}`);
        }
      } else {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/clubs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            club: clubName,
            description,
            tags,
            image: imageUrl,
            userId: currentUser?.uid,
          }),
        });
        if (response.ok) {
          onClose();
        } else {
          const errorMsg = await response.text();
          Alert.alert("Error", `Server rejected request: ${errorMsg}`);
        }
      }
    } catch (err) {
      console.error("Failed to save club:", err);
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
            <ThemedText type="eventTitle">{isEditing ? 'Edit Club' : 'Create Club'}</ThemedText>
            <Pressable onPress={onClose} disabled={loading}>
              <X size={20} color={theme.eventCardText} />
            </Pressable>
          </ThemedView>

          <ScrollView showsVerticalScrollIndicator={false}>

            {/* Image Picker */}
            <ThemedView style={styles.photoRow}>
              <Pressable onPress={handlePickImage} style={styles.thumbnailWrapper}>
                {photoUri ? (
                  <>
                    <Image source={{ uri: photoUri }} style={styles.thumbnail} />
                    <ThemedView style={[styles.editBadge, { backgroundColor: theme.eventCardDropShadow }]}>
                      <Pencil size={11} color={theme.background} />
                    </ThemedView>
                  </>
                ) : (
                  <ThemedView style={[styles.thumbnailPlaceholder, { borderColor: theme.eventCardDropShadow }]}>
                    <Camera size={24} color={theme.eventCardDropShadow} />
                  </ThemedView>
                )}
              </Pressable>
              <ThemedView style={styles.photoMeta}>
                <ThemedText style={styles.photoLabel}>Club Photo</ThemedText>
                <Pressable onPress={handlePickImage}>
                  <ThemedText style={[styles.photoAction, { color: theme.eventCardDropShadow }]}>
                    {photoUri ? 'Change photo' : 'Upload photo'}
                  </ThemedText>
                </Pressable>
                {photoUri && (
                  <Pressable onPress={() => setPhotoUri(null)}>
                    <ThemedText style={styles.photoRemove}>Remove</ThemedText>
                  </Pressable>
                )}
              </ThemedView>
            </ThemedView>

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
                <ThemedText style={{ color: theme.logOutButtonTextDefult }}>Add</ThemedText>
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
              style={[styles.submitButton, { backgroundColor: theme.eventCardDropShadow, opacity: loading ? 0.7 : 1 }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={theme.background} />
              ) : (
                <ThemedText style={{ color: theme.logOutButtonTextDefult, fontWeight: '600' }}>
                  {isEditing ? 'Save Changes' : 'Create Club'}
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
  photoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  thumbnailWrapper: {
    width: 72,
    height: 72,
    borderRadius: 16,
    position: 'relative',
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 16,
  },
  thumbnailPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  editBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoMeta: {
    flex: 1,
    gap: 4,
    backgroundColor: 'transparent',
  },
  photoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  photoAction: {
    fontSize: 13,
  },
  photoRemove: {
    fontSize: 13,
    color: '#e05c5c',
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