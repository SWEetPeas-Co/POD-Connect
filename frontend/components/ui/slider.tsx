import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function Slider() {

  return (
    <ThemedView style={styles.sliderContainer}>
      <ThemedText type='sliderDefault'>Slider</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({

  sliderContainer: {
    height: 35,
    width: '100%',
    backgroundColor: '#E6E1C3',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

});