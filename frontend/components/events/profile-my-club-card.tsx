import { useState, useRef } from "react";
import { StyleSheet, Pressable, Modal, FlatList, Image, useWindowDimensions } from 'react-native';
import { TouchableOpacity, LayoutAnimation, Platform, UIManager, Animated } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import Tag from '../ui/tag';
import { Users, Pencil, Plus, X, ChevronDown } from "lucide-react-native";
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
  description: string
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
  description,
}: ProfileMyClubCardProps) {
  const { mode } = useThemeContext();
  const theme = Colors[mode];
  const [membersVisible, setMembersVisible] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

  const { width } = useWindowDimensions();
  const showLabels = width > 900;

  const toggleExpand = () => {
    Animated.timing(rotation, {
      toValue: expanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <>
      <ThemedView style={[styles.card, { backgroundColor: theme.eventCardBackground, shadowColor: theme.eventCardDropShadow, shadowRadius: 1, shadowOffset: { width: 3, height: 4 } }]}>

        <ThemedView style={styles.top}>

          <Image source={{ uri: image }} style={styles.image} />

          <ThemedView style={styles.text}>
            <ThemedView style={styles.titleRow}>
              <ThemedText type='eventTitle'>{title}</ThemedText>
              <Pressable style={styles.headcountButton} onPress={() => setMembersVisible(true)}>
                <Users size={13} color={theme.eventCardIcon} />
                <ThemedText type='eventSubtitle'> {headcount}</ThemedText>
              </Pressable>
            </ThemedView>

            <ThemedView style={styles.tags}>
              {tags.map((tag, i) => (
                <Tag key={i} label={tag} />
              ))}
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.actions}>
            <ThemedView style={styles.iconRow}>
              <Pressable
                style={[styles.iconButton, { borderColor: theme.eventCardDropShadow }]}
                onPress={onEdit}
              >
                <Pencil size={13} color={theme.eventCardIcon} />
                {showLabels && <ThemedText type='eventSubtitle'>Edit Club</ThemedText>}
              </Pressable>
              <Pressable
                style={[styles.iconButton, { borderColor: theme.eventCardDropShadow }]}
                onPress={onAddEvent}
              >
                <Plus size={13} color={theme.eventCardIcon} />
                {showLabels && <ThemedText type='eventSubtitle'>Add Event</ThemedText>}
              </Pressable>
            </ThemedView>
          </ThemedView>

        </ThemedView>

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

        {expanded && (
          <ThemedView style={styles.bottom}>
            <ThemedText type="eventDescription">{description}</ThemedText>
          </ThemedView>
        )}

        <ThemedView style={styles.expand}>
          <TouchableOpacity onPress={toggleExpand} hitSlop={10}>
            <Animated.View style={{ transform: [{ rotate: rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }}>
              <ChevronDown size={24} color={theme.eventCardIcon} />
            </Animated.View>
          </TouchableOpacity>
        </ThemedView>

      </ThemedView>

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
    minHeight: 60,
    width: '100%',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  text: {
    minHeight: 60,
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
tags: {
  flexDirection: 'row',
  gap: 10,
  flexWrap: 'wrap',
  width: '100%',  // ADD THIS
},

titleRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  flexShrink: 1,
  width: '100%',
},
  actions: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingLeft: 8,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  headcountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  leadersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
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
  bottom: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 9,
  },
  expand: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
});