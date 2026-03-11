// This component styles the tag button

import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type TagProps = {
  label: string
}

export default function Tag({ label }: TagProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={[styles.tag, { backgroundColor: theme.eventCardTagBackground } ]}>
      <ThemedText type='eventTag'>{label}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tag: {
    //backgroundColor: '#98BA7B',
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 4,
    maxHeight: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});