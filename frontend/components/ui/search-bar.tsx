// This component styles the search bar

import { StyleSheet, TextInput } from 'react-native';
import { ThemedView } from '@/components/themed-view';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeContext } from '@/src/lib/themeContext/theme-context';

type SearchBarProps = {
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
}

export default function SearchBar({
  placeholder = 'Search events...',
  value,
  onChangeText,
}: SearchBarProps) {
  //const colorScheme = useColorScheme();
  //const theme = Colors[colorScheme ?? 'light'];
  const { mode } = useThemeContext();
  const theme = Colors[mode];

  return (
    <ThemedView style={[styles.searchBarContainer, {backgroundColor: theme.searchBarBackground }]}>
      <TextInput
        style={[styles.input, { color: '#569170' }]}
        placeholder={placeholder}
        placeholderTextColor="#98BA7B"
        value={value}
        onChangeText={onChangeText}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({

  searchBarContainer: {
    flex: 1,
    height: 35,
    width: '100%',
    //backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  input: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    fontSize: 14,
    borderRadius: 10,
  },

});