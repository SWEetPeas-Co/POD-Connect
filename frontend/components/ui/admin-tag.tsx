// This is an admin tag

import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

import { Colors } from '@/constants/theme';
import { useThemeContext } from '@/src/lib/themeContext/theme-context';

type AdminProps = {
  label: string
}

export default function Admin({ label }: AdminProps) {
  const { mode } = useThemeContext();
  const theme = Colors[mode];

  return (
    <ThemedView style={[styles.admin, { backgroundColor: theme.eventCardTagBackground }]}>
      <ThemedText type='eventTag'>{label}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  admin: {
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 4,
    maxHeight: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});