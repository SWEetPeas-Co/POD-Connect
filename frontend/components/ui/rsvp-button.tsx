import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useState } from "react";

export default function RSVPButton() {
  const [rsvped, setRsvped] = useState(false);

  function toggleRSVP() {
    setRsvped(!rsvped);
  }

  return (
    <Pressable
      style={[styles.button, rsvped && styles.buttonActive]}
      onPress={toggleRSVP}
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