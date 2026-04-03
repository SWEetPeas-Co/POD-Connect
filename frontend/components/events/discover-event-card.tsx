import { useState, useRef } from "react";
import { StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager, Animated } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import RSVPButton from '../ui/rsvp-button';
import StarButton from '../ui/star-button';

import { Clock, Users, MapPin, ChevronDown } from "lucide-react-native";
import { Image } from "react-native";

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type EventCardProps = {
  id: number;
  clubId: number;
  club: string;
  image: string;
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
  club,
  rsvped,
  onToggleRSVP,
  favoriteIds,
  onToggleFavorite,
  title,
  location,
  time,
  description,
  headcount,
  image,
}: EventCardProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [expanded, setExpanded] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

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
    <ThemedView style={[styles.card, {shadowColor: theme.eventCardDropShadow, shadowRadius: 1, shadowOffset: { width: 3, height: 4 }}]}>

      <ThemedView style={styles.top}>

        <Image source={{ uri: image }} style={styles.image} />

        <ThemedView style={styles.text}>
          <ThemedText type='eventTitle'>{title}</ThemedText>
          <ThemedView style={styles.subtitle}>
            <ThemedText type='eventSubtitle'>{club}</ThemedText>
            <StarButton active={favoriteIds.includes(clubId)} onPress={() => onToggleFavorite(clubId)} style={{ marginTop: -2 }} />
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.rsvp}>
          <RSVPButton rsvped={rsvped} onPress={() => onToggleRSVP(id)} />
          <ThemedView style={styles.iconRow}>
            <Users size={14} color={theme.eventCardIcon} />
            <ThemedText type='eventSubtitle'> {headcount}</ThemedText>
          </ThemedView>
        </ThemedView>

      </ThemedView>

      <ThemedView style={styles.middle}>
        <ThemedView style={styles.iconRow}>
          <MapPin size={14} color={theme.eventCardIcon} />
          <ThemedText type='eventSubtitle'> {location}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.iconRow}>
          <Clock size={14} color={theme.eventCardIcon} />
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
          <Animated.View style={{ transform: [{ rotate: rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }}>
            <ChevronDown size={24} color={theme.eventCardIcon} />
          </Animated.View>
        </TouchableOpacity>
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 15,
    padding: 12,
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
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  text: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
    height: 60,
    alignItems: 'flex-start',
  },
  subtitle: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    gap: 6,
  },
  rsvp: {
    height: 60,
    width: 90,
    alignItems: 'flex-end',
    gap: 4,
  },
  rsvpButton: {
    height: 25,
    width: 90,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middle: {
    flexDirection: 'row',
    height: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    gap: 20,
    paddingTop: 5,
  },
  bottom: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  expand: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
});