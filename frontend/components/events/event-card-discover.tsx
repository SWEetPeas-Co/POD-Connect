import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import Tag from '../ui/tag';
import { Users } from "lucide-react-native";

type DiscoverCardProps = {
  title: string
  tags: string[]
  headcount: number
}

export default function DiscoverEventCard({
  title,
  tags,
  headcount,
}: DiscoverCardProps) {

  return (
    <ThemedView style={styles.card}>

      <ThemedView style={styles.top}>

        <ThemedView style={styles.image} />

        <ThemedView style={styles.text}>
          <ThemedText type='eventTitle'>{title}</ThemedText>

          <ThemedView style={styles.tags}>
            {tags.map((tag, i) => (
              <Tag key={i} label={tag} />
            ))}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.rsvp}>
          <ThemedView style={styles.iconRow}>
            <Users size={14} color="#4A7E61" />
            <ThemedText type='eventSubtitle'> {headcount}  </ThemedText>
            <ThemedView style={styles.star}/>
          </ThemedView>
        </ThemedView>

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
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },

  text: {
    height: 60,
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#E6E1C3',
  },

  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E1C3',
  },

  tags: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#E6E1C3',
  },

  rsvp: {
    flexDirection: 'row',
    gap: 10,
    height: 60,
    width: 90,
    backgroundColor: '#E6E1C3',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  star: {
    height: 25,
    width: 25,
    backgroundColor: '#98BA7B',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

});