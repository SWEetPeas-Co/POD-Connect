// This component makes the card for discover-club

import { useState, useRef } from "react";
import { StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager, Animated } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import Tag from '../ui/tag';
import { Users, ChevronDown } from "lucide-react-native";
import StarButton from '../ui/star-button';

import { Image } from "react-native";
// <ThemedView style={[styles.image, {backgroundColor: theme.searchBarBackground}]} />

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeContext } from '@/src/lib/themeContext/theme-context';

type DiscoverClubCardProps = {
  id: number
  title: string
  tags: string[]
  headcount: number
  image: string
  active: boolean
  onToggle: () => void
  description: string
}

export default function DiscoverClubCard({
  title,
  tags,
  headcount,
  image,
  active,
  description,
  onToggle
}: DiscoverClubCardProps) {
  //const colorScheme = useColorScheme();
  //const theme = Colors[colorScheme ?? 'light'];
  const { mode } = useThemeContext();
  const theme = Colors[mode];
  
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

      {expanded && (
        <ThemedView style={styles.bottom}>
          <ThemedText type="eventDescription">{description}</ThemedText>
        </ThemedView>
      )}

      <ThemedView style={styles.expand}>
        <TouchableOpacity onPress={toggleExpand} hitSlop={10}>
          <Animated.View style={{ transform: [{rotate: rotation.interpolate({inputRange: [0, 1], outputRange: ['0deg', '180deg'], }),},],}}> {/*rotates half turn*/}
            <ChevronDown size={24} color={theme.eventCardIcon}  />
          </Animated.View>
        </TouchableOpacity>
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