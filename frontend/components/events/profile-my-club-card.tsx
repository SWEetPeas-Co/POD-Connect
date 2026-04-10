import { useState } from 'react';
import { StyleSheet, Pressable, Modal, FlatList, Image } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import Tag from '../ui/tag';
import { Users, Pencil, Plus, X } from "lucide-react-native";
import { Colors } from '@/constants/theme';
import { useThemeContext } from '@/src/lib/themeContext/theme-context';

type Member = {
  id: number;
  name: string;
  avatar?: string;
};

type ProfileMyClubCardProps = {
  id: number;
  title: string;
  tags: string[];
  headcount: number;
  image: string;
  leaders?: Member[];
  members?: Member[];
  onEdit: () => void;
  onAddEvent: () => void;
};

export default function ProfileMyClubCard({
  title,
  tags,
  headcount,
  image,
  leaders = [],
  members = [],
  onEdit,
  onAddEvent,
}: ProfileMyClubCardProps) {
  const { mode } = useThemeContext();
  const theme = Colors[mode];
  const [membersVisible, setMembersVisible] = useState(false);

  return (
    <>
      <ThemedView style={[styles.card, { backgroundColor: theme.eventCardBackground, shadowColor: theme.eventCardDropShadow, shadowRadius: 1, shadowOffset: { width: 3, height: 4 } }]}>

        {/* Top row */}
        <ThemedView style={styles.top}>
          <Image source={{ uri: image }} style={styles.image} />

          <ThemedView style={styles.text}>
            <ThemedText type='eventTitle'>{title}</ThemedText>
            <ThemedView style={styles.tags}>
              {tags.map((tag, i) => (
                <Tag key={i} label={tag} />
              ))}
            </ThemedView>
          </ThemedView>

          {/* Action buttons */}
          <ThemedView style={styles.actions}>
            <Pressable
              style={[styles.iconButton, { borderColor: theme.eventCardDropShadow }]}
              onPress={onEdit}
            >
              <Pencil size={13} color={theme.eventCardIcon} />
            </Pressable>
            <Pressable
              style={[styles.iconButton, { borderColor: theme.eventCardDropShadow }]}
              onPress={onAddEvent}
            >
              <Plus size={13} color={theme.eventCardIcon} />
            </Pressable>
          </ThemedView>
        </ThemedView>

        {/* Bottom row — leaders + headcount */}
        <ThemedView style={styles.bottom}>

          {leaders.length > 0 && (
            <ThemedView style={styles.leadersRow}>
              <ThemedText type='eventSubtitle'>Led by: </ThemedText>
              {leaders.map((l, i) => (
                <ThemedText key={l.id} type='eventSubtitle'>
                  {l.name}{i < leaders.length - 1 ? ', ' : ''}
                </ThemedText>
              ))}
            </ThemedView>
          )}

          {/* Headcount — tap to open members */}
          <Pressable style={styles.headcountButton} onPress={() => setMembersVisible(true)}>
            <Users size={13} color={theme.eventCardIcon} />
            <ThemedText type='eventSubtitle'> {headcount}</ThemedText>
          </Pressable>

        </ThemedView>
      </ThemedView>

      {/* Members popup */}
      <Modal visible={membersVisible} transparent animationType="fade">
        <ThemedView style={styles.modalOverlay}>
          <ThemedView style={[styles.membersCard, { backgroundColor: theme.eventCardBackground }]}>

            <ThemedView style={styles.membersHeader}>
              <ThemedText type='eventTitle'>Members ({members.length})</ThemedText>
              <Pressable onPress={() => setMembersVisible(false)}>
                <X size={20} color={theme.eventCardText} />
              </Pressable>
            </ThemedView>

            {members.length === 0 ? (
              <ThemedText type='eventSubtitle'>No members yet.</ThemedText>
            ) : (
              <FlatList
                data={members}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <ThemedView style={styles.memberRow}>
                    {item.avatar ? (
                      <Image source={{ uri: item.avatar }} style={styles.memberAvatar} />
                    ) : (
                      <ThemedView style={[styles.memberAvatarPlaceholder, { backgroundColor: theme.eventCardDropShadow }]}>
                        <ThemedText style={styles.memberInitial}>
                          {item.name.charAt(0).toUpperCase()}
                        </ThemedText>
                      </ThemedView>
                    )}
                    <ThemedText type='eventSubtitle'>{item.name}</ThemedText>
                  </ThemedView>
                )}
                ItemSeparatorComponent={() => (
                  <ThemedView style={[styles.separator, { backgroundColor: theme.eventCardDropShadow }]} />
                )}
              />
            )}

          </ThemedView>
        </ThemedView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 15,
    padding: 12,
    shadowRadius: 1,
    shadowOffset: { width: 3, height: 4 },
    gap: 10,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    width: '100%',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  text: {
    height: 60,
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tags: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  actions: {
    flexDirection: 'column',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconButton: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  leadersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    backgroundColor: 'transparent',
  },
  headcountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  membersCard: {
    width: '80%',
    maxHeight: '60%',
    borderRadius: 20,
    padding: 20,
    gap: 14,
  },
  membersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  memberAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  memberAvatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberInitial: {
    fontSize: 15,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    opacity: 0.3,
  },
});