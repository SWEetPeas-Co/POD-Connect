import { useState, useRef } from "react";
import { StyleSheet, Pressable, Modal, FlatList, Image, useWindowDimensions } from 'react-native';
import { TouchableOpacity, LayoutAnimation, Platform, UIManager, Animated } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import Tag from '../ui/tag';
import { Users, Pencil, Plus, X, ChevronDown } from "lucide-react-native";
import { Colors } from '@/constants/theme';
import { useThemeContext } from '@/src/lib/themeContext/theme-context';
import AdminTag from '../ui/admin-tag';
import EventCard from "../events/discover-event-card";
import defaultClubImage from '@/assets/images/sweetpeacologo.png';
import defaultAvatar from '@/assets/images/default-profile.png';
import { getUsersByIds, getEvents } from "@/src/lib/api";

type Member = {
  firebaseUid: string;
  name: string;
  profileImage?: string;
};

type Event = {
  id: number;
  clubId: number;
  club: string;
  image: string;
  rsvped: boolean;
  title: string;
  location: string;
  time: string;
  description: string;
  headcount: number;
};

type ProfileMyClubCardProps = {
  id: number;
  title: string;
  tags: string[];
  headcount: number;
  image: string;
  admins?: string[];
  members?: string[];
  onEdit: () => void;
  onAddEvent: () => void;
  description: string;
  events?: Event[];
};

export default function ProfileMyClubCard({
  title,
  tags,
  headcount,
  image,
  admins = [],
  members = [],
  onEdit,
  onAddEvent,
  description,
  events = [],
  id,
}: ProfileMyClubCardProps) {
  const { mode } = useThemeContext();
  const theme = Colors[mode];
  const [membersVisible, setMembersVisible] = useState(false);
  const [eventsVisible, setEventsVisible] = useState(false);
  const [fetchedMembers, setFetchedMembers] = useState<Member[]>([]);
  const [fetchedEvents, setFetchedEvents] = useState<any[]>([]);

  const [expanded, setExpanded] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

  const { width } = useWindowDimensions();
  const showLabels = width > 900;

  const testAdmins: Member[] = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Brian Lee" },
    { id: 3, name: "Carlos Rivera" },
  ];

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

          <Image
            source={
              image && image.trim() !== ''
                ? { uri: image }
                : defaultClubImage
            }
            style={styles.image}
          />

          <ThemedView style={styles.text}>
            <ThemedView style={styles.titleRow}>
              <ThemedText type='eventTitle'>{title}</ThemedText>
              <Pressable style={styles.headcountButton} onPress={async () => {
                  setMembersVisible(true);
                  const users = await getUsersByIds(members as string[]);
                  setFetchedMembers(users);
                }}>
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

        {expanded && (
          <ThemedView style={styles.bottom}>
            <ThemedText type="eventDescription">{description}</ThemedText>
            
            {admins.length > 0 && (
              <ThemedView style={styles.adminRow}>
                <ThemedText type="eventDescription">Club Leaders: </ThemedText>

                <ThemedView style={styles.adminTags}>
                  {admins.map((admin) => (
                    <AdminTag key={admin.id} label={admin.name} />
                  ))}
                </ThemedView>
              </ThemedView>
            )}

            <Pressable
              style={[styles.eventsButton, { borderColor: theme.eventCardDropShadow }]}
              onPress={async () => {
                const allEvents = await getEvents();
                const clubEvents = allEvents.filter((e: any) => e.clubId === String(id));
                setFetchedEvents(clubEvents);
                setEventsVisible(true);
              }}
            >
              <ThemedText type="eventSubtitle">View Events</ThemedText>
            </Pressable>
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

            {fetchedMembers.length === 0 ? (
              <ThemedText type='eventSubtitle'>No members yet.</ThemedText>
            ) : (
              <FlatList
                data={fetchedMembers}
                keyExtractor={(item) => item.firebaseUid}
                renderItem={({ item }) => (
                  <ThemedView style={styles.memberRow}>
                    {item.profileImage ? (
                      <Image source={{ uri: item.profileImage }} style={styles.memberAvatar} />
                    ) : (
                      <Image source={defaultAvatar} style={styles.memberAvatar} />
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
      

      <Modal visible={eventsVisible} transparent animationType="fade">
        <ThemedView style={styles.modalOverlay}>
          <ThemedView style={[styles.membersCard, { backgroundColor: theme.eventCardBackground }]}>

            <ThemedView style={styles.membersHeader}>
              <ThemedText type='eventTitle'>Events ({fetchedEvents.length})</ThemedText>

              <Pressable onPress={() => setEventsVisible(false)}>
                <X size={20} color={theme.eventCardText} />
              </Pressable>
            </ThemedView>

            {fetchedEvents.length === 0 ? (
              <ThemedText type='eventSubtitle'>No events yet.</ThemedText>
            ) : (
              <FlatList
                data={fetchedEvents}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <ThemedView style={[styles.memberRow, { justifyContent: 'space-between' }]}>
                    <ThemedView style={{ flex: 1, gap: 4, backgroundColor: 'transparent' }}>
                      <ThemedText type='eventTitle'>{item.title}</ThemedText>
                      <ThemedText type='eventSubtitle'>{item.location}  ·  {item.time}</ThemedText>
                    </ThemedView>
                    <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'transparent' }}>
                      <Users size={13} color={theme.eventCardIcon} />
                      <ThemedText type='eventSubtitle'>{item.headcount}</ThemedText>
                    </ThemedView>
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
    paddingTop: 0,
    gap: 10,
  },
  expand: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  adminRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },

  adminTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  eventsButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
});