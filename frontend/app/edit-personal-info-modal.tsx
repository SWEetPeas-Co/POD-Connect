import { useState, useEffect } from "react";
import { Modal, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import { X } from "lucide-react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from '@/constants/theme';
import { useThemeContext } from "@/src/lib/themeContext/theme-context";

type PersonalInfo = {
  name: string;
  email: string;
  password: string;
};

export default function EditPersonalInfoModal({
  visible,
  onClose,
  personalInfo = null,
}: {
  visible: boolean;
  onClose: () => void;
  personalInfo?: PersonalInfo | null;
}) {
  const { mode } = useThemeContext();
  const theme = Colors[mode];

  const isEditing = personalInfo !== null;

  const [personalName, setPersonalName] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [personalPassword, setPersonalPassword] = useState('');

  // Pre-fill when editing
  useEffect(() => {
    if (personalInfo) {
      setPersonalName(personalInfo.name);
      setPersonalEmail(personalInfo.email); // Assuming the Club type has an email property
      setPersonalPassword(personalInfo.password); // Assuming the PersonalInfo type has a password property
    } else {
      setPersonalName('');
      setPersonalEmail('');
      setPersonalPassword('');
    }
  }, [personalInfo, visible]);

  const handleSubmit = () => {
    if (!personalName.trim()) return;
    console.log("Updating Personal Info:", { personalName, personalEmail, personalPassword });
    // TODO: call API here
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <ThemedView style={styles.overlay}>
        <ThemedView style={[styles.card, { backgroundColor: theme.eventCardBackground }]}>

          <ThemedView style={styles.cardHeader}>
            <ThemedText type="eventTitle">{'Edit Personal Info'}</ThemedText>
            <Pressable onPress={onClose}>
              <X size={20} color={theme.eventCardText} />
            </Pressable>
          </ThemedView>

          <ScrollView showsVerticalScrollIndicator={false}>

            <ThemedText style={styles.label}>Name</ThemedText>
            <TextInput
              style={[styles.input, { color: theme.eventCardText, borderColor: theme.eventCardDropShadow }]}
              placeholder="e.g. Jane Doe"
              placeholderTextColor={theme.eventCardDropShadow}
              value={personalName}
              onChangeText={setPersonalName}
            />

            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
              style={[styles.input, { color: theme.eventCardText, borderColor: theme.eventCardDropShadow }]}
              placeholder="e.g. jane.doe@example.com"
              placeholderTextColor={theme.eventCardDropShadow}
              value={personalEmail}
              onChangeText={setPersonalEmail}
            />

            <ThemedText style={styles.label}>Password</ThemedText>
              <TextInput
                style={[styles.input, { color: theme.eventCardText, borderColor: theme.eventCardDropShadow }]}
                placeholder="Reset your password"
                placeholderTextColor={theme.eventCardDropShadow}
                value={personalPassword}
                onChangeText={setPersonalPassword}
              />

            <Pressable
              style={[styles.submitButton, { backgroundColor: theme.eventCardDropShadow }]}
              onPress={handleSubmit}
            >
              <ThemedText style={{ color: theme.background, fontWeight: '600' }}>
                {'Save Changes'}
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
  submitButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
});