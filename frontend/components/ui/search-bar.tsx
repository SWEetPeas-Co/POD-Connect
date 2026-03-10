import { StyleSheet, TextInput } from 'react-native';
import { ThemedView } from '@/components/themed-view';

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

  return (
    <ThemedView style={styles.searchBarContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
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
    backgroundColor: '#ffffff',
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