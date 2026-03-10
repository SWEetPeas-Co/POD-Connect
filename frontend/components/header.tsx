import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

type HeaderProps = {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <ThemedView style={styles.headerContainer}>
      <ThemedText type='header'>
        {title}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({

  headerContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 65,

    backgroundColor: '#569170',

    shadowColor: '#4A7E61',
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 5 },

    justifyContent: 'center',
    alignItems: 'center',

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

});