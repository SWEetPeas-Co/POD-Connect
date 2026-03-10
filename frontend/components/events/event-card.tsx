import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import RSVPButton from '../ui/rsvp-button';

import { Clock, Users, MapPin } from "lucide-react-native";

type EventCardProps = {
  title: string
  club: string
  location: string
  time: string
  description: string
  headcount: number
}

export default function EventCard({
  title,
  club,
  location,
  time,
  description,
  headcount,
}: EventCardProps) {

  return (
    <ThemedView style={styles.card}>

      <ThemedView style={styles.top}>

        <ThemedView style={styles.image} />

        <ThemedView style={styles.text}>
          <ThemedText type='eventTitle'>{title}</ThemedText>
          <ThemedText type='eventSubtitle'>{club}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.rsvp}>
          <RSVPButton />

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

      <ThemedView style={styles.bottom}>
        <ThemedText type='eventDescription'>{description}</ThemedText>
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
  },

});