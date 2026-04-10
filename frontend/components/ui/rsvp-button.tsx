// This component controls style of RSVP Button
// Logic is in discover-events and my-events
// src/context is where it connects

import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeContext } from '@/src/lib/themeContext/theme-context';

type RSVPButtonProps = {
  rsvped: boolean
  onPress: () => void
}

export default function RSVPButton({ rsvped, onPress }: RSVPButtonProps) {
  //const colorScheme = useColorScheme();
  //const theme = Colors[colorScheme ?? 'light'];
  const { mode } = useThemeContext();
  const theme = Colors[mode];

  return (
    <Pressable
      style={[styles.button, {backgroundColor: theme.rsvpButtonBackgroundDefault }, rsvped && {backgroundColor: theme.rsvpButtonBackgroundSelected }]}
      onPress={onPress}
    >
      <ThemedText
        type="eventSubtitle"
        lightColor={rsvped ? theme.rsvpButtonTextSelected : theme.rsvpButtonTextDefault}
        darkColor={rsvped ? theme.rsvpButtonTextSelected : theme.rsvpButtonTextDefault}
      >
        {rsvped ? "unRSVP" : "RSVP"}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({

  button: {
    height: 25,
    width: 90,
    //backgroundColor: '#98BA7B',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonActive: {
    //backgroundColor: "#3F6F4F",
  },

});