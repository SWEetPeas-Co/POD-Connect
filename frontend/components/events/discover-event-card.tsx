// This component is discvoer-event-card, right now it is a copy paste of event-card

import { useState, useRef } from "react";
import { StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager, Animated } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import RSVPButton from '../ui/rsvp-button';
import StarButton from '../ui/star-button';

import { clubs } from '@/data/clubs';
import { Clock, Users, MapPin, ChevronDown } from "lucide-react-native";

type EventCardProps = {
  id: number;
  clubId: number;
  rsvped: boolean;
  onToggleRSVP: (id: number) => void;
  favoriteIds: number[];
  onToggleFavorite: (id: number) => void;
  title: string;
  location: string;
  time: string;
  description: string;
  headcount: number;
}

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function EventCard({
  id,
  clubId,
  rsvped,
  onToggleRSVP,
  favoriteIds,
  onToggleFavorite,
  title,
  location,
  time,
  description,
  headcount,
}: EventCardProps) {
    const club = clubs.find(c => c.id === clubId);

    const [expanded, setExpanded] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    // Animate the chevron
    Animated.timing(rotation, {
      toValue: expanded ? 0 : 1, // rotate back if collapsing
      duration: 200,
      useNativeDriver: true,
    }).start();

    // Animate the layout for expanding/collapsing
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <ThemedView style={styles.card}>

      <ThemedView style={styles.top}>

        <ThemedView style={styles.image} />

        <ThemedView style={styles.text}>
          <ThemedText type='eventTitle'>{title}</ThemedText>
          <ThemedView style={styles.subtitle}>
            <ThemedText type='eventSubtitle'>{club?.club}</ThemedText>
            <StarButton active={favoriteIds.includes(clubId)} onPress={() => onToggleFavorite(clubId)} style={{ marginTop: -2 }} />
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.rsvp}>
          <RSVPButton rsvped={rsvped} onPress={() => onToggleRSVP(id)} />

          <ThemedView style={styles.iconRow}>
            <Users size={14} color="#4A7E61" />
            <ThemedText type='eventSubtitle'> {headcount}</ThemedText>
          </ThemedView>
        </ThemedView>

      </ThemedView>

      <ThemedView style={styles.middle}>

        <ThemedView style={styles.iconRow}>
            <MapPin size={14} color="#4A7E61" />
            <ThemedText type='eventSubtitle'> {location}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.iconRow}>
            <Clock size={14} color="#4A7E61" />
            <ThemedText type='eventSubtitle'> {time}</ThemedText>
        </ThemedView>
      </ThemedView>

      {expanded && (
              <ThemedView style={styles.bottom}>
                <ThemedText type='eventDescription'>{description}</ThemedText>
              </ThemedView>
            )}
      
            <ThemedView style={styles.expand}>
              <TouchableOpacity onPress={toggleExpand} hitSlop={10}>
                <Animated.View style={{ transform: [{rotate: rotation.interpolate({inputRange: [0, 1], outputRange: ['0deg', '180deg'], }),},],}}> {/*rotates half turn*/}
                  <ChevronDown size={24} color="#4A7E61" />
                </Animated.View>
              </TouchableOpacity>
            </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({

  card: {
    width: '100%',
    backgroundColor: '#E6E1C3',
    borderRadius: 15,
    padding: 12,
    shadowColor: '#569170',
    shadowRadius: 1,
    shadowOffset: { width: 3, height: 4 },
    justifyContent: 'center',
    alignItems: 'center',
  },

  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    width: '100%',
    backgroundColor: '#E6E1C3',
  },

  image: {
    height: 60,
    width: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  text: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
    height: 60,
    alignItems: 'flex-start',
    backgroundColor: '#E6E1C3',
  },

  subtitle: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    gap: 6,
    backgroundColor: '#E6E1C3', 
  },

  rsvp: {
    height: 60,
    width: 90,
    alignItems: 'flex-end',
    gap: 4,
    backgroundColor: '#E6E1C3',
  },

  rsvpButton: {
    height: 25,
    width: 90,
    backgroundColor: '#98BA7B',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E1C3',
  },

  middle: {
    flexDirection: 'row',
    height: 30,
    width: '100%',
    backgroundColor: '#E6E1C3',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    gap: 20,
    paddingTop: 5,
  },

  bottom: {
    width: '100%',
    backgroundColor: '#E6E1C3',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 5,
  },

  expand: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    backgroundColor: "#E6E1C3",
  },

});