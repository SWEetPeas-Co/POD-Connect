// this component is a toggle button for light/dark mode and colorblind mode, using animated values for smooth transitions. It uses the theme context to get and set the current modes, and updates the UI accordingly. The button shows a sun/moon icon for light/dark mode and an eye/eye-off icon for colorblind mode, with appropriate accessibility labels.

import React, { useRef } from 'react';
import { View, Pressable, StyleSheet, Animated } from 'react-native';
import { Sun, Moon, Eye, EyeOff } from 'lucide-react-native';
import { Colors } from '@/constants/theme';
import { useThemeContext } from '@/src/lib/themeContext/theme-context';

type ColorModeSwitcherProps = {
  show?: 'ld' | 'cb' | 'both';
};

export default function ColorModeSwitcher({ show = 'both' }: ColorModeSwitcherProps) {
  const { mode, ldMode, setLdMode, colorblindOn, setColorblindOn, setMode } = useThemeContext();
  const theme = Colors[mode];

  const ldAnim = useRef(new Animated.Value(ldMode === 'dark' ? 1 : 0)).current;
  const cbAnim = useRef(new Animated.Value(colorblindOn ? 1 : 0)).current;

  const toggleLD = () => {
    const newLd = ldMode === 'light' ? 'dark' : 'light';
    setLdMode(newLd);
    Animated.timing(ldAnim, {
      toValue: newLd === 'dark' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    if (!colorblindOn) setMode(newLd);
  };

  const toggleColorblind = () => {
    const newCb = !colorblindOn;
    setColorblindOn(newCb);
    Animated.timing(cbAnim, {
      toValue: newCb ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setMode(newCb ? 'colorblind' : ldMode);
  };

  const ldThumbPos = ldAnim.interpolate({ inputRange: [0, 1], outputRange: [2, 22] });
  const cbThumbPos = cbAnim.interpolate({ inputRange: [0, 1], outputRange: [2, 22] });

  return (
    <View style={styles.row}>
      {(show === 'ld' || show === 'both') && (
        <View style={styles.toggleGroup}>
          <Sun size={16} color={theme.headerText} />
          <Pressable
            onPress={toggleLD}
            style={[styles.track, {
              backgroundColor: ldMode === 'dark'
                ? theme.rsvpButtonBackgroundSelected
                : theme.sliderBackgroundDefault,
            }]}
            accessibilityRole="switch"
            accessibilityState={{ checked: ldMode === 'dark' }}
            accessibilityLabel="Toggle light and dark mode"
          >
            <Animated.View style={[styles.thumb, {
              backgroundColor: theme.headerBackground,
              transform: [{ translateX: ldThumbPos }],
            }]} />
          </Pressable>
          <Moon size={16} color={theme.headerText} />
        </View>
      )}

      {(show === 'cb' || show === 'both') && (
        <View style={styles.toggleGroup}>
          <Eye size={16} color={theme.headerText} />
          <Pressable
            onPress={toggleColorblind}
            style={[styles.track, {
              backgroundColor: colorblindOn
                ? theme.rsvpButtonBackgroundSelected
                : theme.sliderBackgroundDefault,
            }]}
            accessibilityRole="switch"
            accessibilityState={{ checked: colorblindOn }}
            accessibilityLabel="Toggle colorblind mode"
          >
            <Animated.View style={[styles.thumb, {
              backgroundColor: theme.headerBackground,
              transform: [{ translateX: cbThumbPos }],
            }]} />
          </Pressable>
          <EyeOff size={16} color={theme.headerText} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: 'center', padding: 12 },
  toggleGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  track: { width: 46, height: 26, borderRadius: 13, justifyContent: 'center' },
  thumb: { width: 22, height: 22, borderRadius: 11 },
});