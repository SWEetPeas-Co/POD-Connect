// This component makes the card for discover-club

import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import Tag from '../ui/tag';
import { Users } from "lucide-react-native";
import StarButton from '../ui/star-button';

import { Image } from "react-native";
// <ThemedView style={[styles.image, {backgroundColor: theme.searchBarBackground}]} />

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type DiscoverClubCardProps = {
  id: number
  title: string
  tags: string[]
  headcount: number
  image: string
  active: boolean
  onToggle: () => void
}

export default function DiscoverClubCard({
  title,
  tags,
  headcount,
  active,
  onToggle
}: DiscoverClubCardProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={[styles.card, {shadowColor: theme.eventCardDropShadow, shadowRadius: 1,shadowOffset: { width: 3, height: 4 },}]}>

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

        <ThemedView style={styles.rsvp}>
          <ThemedView style={styles.iconRow}>
            <Users size={14} color={theme.eventCardIcon}  />
            <ThemedText type='eventSubtitle'> {headcount}  </ThemedText>
            <StarButton active={active} onPress={onToggle} />
          </ThemedView>
        </ThemedView>

      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({

  card: {
    width: '100%',
    //backgroundColor: '#E6E1C3',
    borderRadius: 15,
    padding: 12,
    //shadowColor: '#569170',
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
    //backgroundColor: '#E6E1C3',
  },

  image: {
    height: 60,
    width: 60,
    //backgroundColor: '#ffffff',
    borderRadius: 10,
  },

  text: {
    height: 60,
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    //backgroundColor: '#E6E1C3',
  },

  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: '#E6E1C3',
  },

  tags: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //backgroundColor: '#E6E1C3',
  },

  rsvp: {
    flexDirection: 'row',
    gap: 10,
    height: 60,
    width: 90,
    //backgroundColor: '#E6E1C3',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  star: {
    height: 25,
    width: 25,
    //backgroundColor: '#98BA7B',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

});