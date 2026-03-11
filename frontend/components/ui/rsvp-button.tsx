// This component controls style of RSVP Button
// Logic is in discover-events and my-events
// src/context is where it connects

import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';

type RSVPButtonProps = {
  rsvped: boolean
  onPress: () => void
}

export default function RSVPButton({ rsvped, onPress }: RSVPButtonProps) {
  return (
    <Pressable
      style={[styles.button, rsvped && styles.buttonActive]}
      onPress={onPress}
    >
      <ThemedText type='eventSubtitle'>
        {rsvped ? "unRSVP" : "RSVP"}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({

  button: {
    height: 25,
    width: 90,
    backgroundColor: '#98BA7B',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonActive: {
    backgroundColor: "#3F6F4F",
  },

});