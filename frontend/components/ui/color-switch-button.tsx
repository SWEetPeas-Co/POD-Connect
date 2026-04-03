
import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ColorModeSwitcherProps = {
  onModeChange?: (mode: 'light' | 'dark' | 'colorblind') => void;
};

// <ColorModeSwitcher onModeChange={handleModeChange} />

export default function ColorModeSwitcher({ onModeChange }: ColorModeSwitcherProps) {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<'light' | 'dark' | 'colorblind'>(systemColorScheme ?? 'light');

  React.useEffect(() => {
    if (systemColorScheme && mode !== 'colorblind') {
      setMode(systemColorScheme);
    }
  }, [systemColorScheme]);

  const toggleLightDark = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    onModeChange?.(newMode);
  };

  const enableColorblind = () => {
    setMode('colorblind');
    onModeChange?.('colorblind');
  };

  const theme = Colors[mode] || Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.headerText }]}>
        Current Mode: {mode.toUpperCase()}
      </Text>

      <View style={styles.buttons}>
        <Pressable 
          style={[styles.button, { backgroundColor: theme.sliderBackgroundDefault }]} 
          onPress={toggleLightDark}
        >
          <Text style={{ color: theme.sliderTextDefault }}>Toggle Light/Dark</Text>
        </Pressable>

        <Pressable 
          style={[styles.button, { backgroundColor: theme.sliderBackgroundSelected }]} 
          onPress={enableColorblind}
        >
          <Text style={{ color: theme.sliderTextSelected }}>Enable Colorblind</Text>
        </Pressable>
      </View>
    </View>
  );
}
  // Toggle between light and dark, but ignore colorblind mode
//   const toggleLightDark = () => {
//     setMode(prev => {
//       let newMode: 'light' | 'dark' | 'colorblind';
//       if (prev === 'light') newMode = 'dark';
//       else if (prev === 'dark') newMode = 'light';
//       else newMode = 'light'; // if colorblind, switch back to light
//       onModeChange?.(newMode);
//       return newMode;
//     });
//   };

//   // Enable colorblind mode regardless of current light/dark mode
//   const enableColorblind = () => {
//     setMode('colorblind');
//     onModeChange?.('colorblind');
//   };

//   // Determine theme colors for UI
//   const theme = Colors[mode === 'colorblind' ? 'colorblind' : mode];

//   return (
//     <View style={[styles.container, { backgroundColor: theme.background }]}>
//       <Text style={[styles.label, { color: theme.headerText }]}>Current Mode: {mode.toUpperCase()}</Text>

//       <View style={styles.buttons}>
//         <Pressable style={[styles.button, { backgroundColor: theme.sliderBackgroundDefault }]} onPress={toggleLightDark}>
//           <Text style={{ color: theme.sliderTextDefault }}>Toggle Light/Dark</Text>
//         </Pressable>

//         <Pressable style={[styles.button, { backgroundColor: theme.sliderBackgroundSelected }]} onPress={enableColorblind}>
//           <Text style={{ color: theme.sliderTextSelected }}>Enable Colorblind</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
});