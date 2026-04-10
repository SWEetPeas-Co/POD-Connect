// This component styles the header on top of each tab

import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeContext } from '@/src/lib/themeContext/theme-context';

type HeaderProps = {
  title: string
}

export default function Header({ title }: HeaderProps) {
  //const colorScheme = useColorScheme();
  //const theme = Colors[colorScheme ?? 'light'];
  const { mode } = useThemeContext();
  const theme = Colors[mode];
  
  return (
    <ThemedView style={[styles.headerContainer, { backgroundColor: theme.headerBackground, shadowColor: theme.headerDropShadow, shadowRadius: 2, shadowOffset: { width: 0, height: 5 }, } ]}>
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

    //backgroundColor: '#569170',

    //shadowColor: '#4A7E61',
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 5 },

    justifyContent: 'center',
    alignItems: 'center',

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

});