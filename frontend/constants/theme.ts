// This document holds all out colors and color schemes and fonts used in this app
// It includes light/dark mode that needs to be added later

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// color pallette
const mediumGreen = '#569170';
const lightGreen = '#98BA7B';
const darkGreen = '#4A7E61';
const beige = '#E6E1C3';
const darkBeige = '#D4CEAB';
const lightPink = '#EFD7DD';
const white = '#FFFFFF';
const black = '#000000';
const yellow = '#CCB423';

// Defines the colors in light and dark mode
/**
 * Define:
 * const colorScheme = useColorScheme();
 * const theme = Colors[colorScheme ?? 'light'];
 * 
 * Example of it being used:
 * <View style={{ backgroundColor: theme.background }}>
 *  <Text style={{ color: theme.headerText }}>
 *    Welcome]
 *  </Text>
 * </View>
 */
export const Colors = {
  light: {
    // Page
    background: lightGreen,

    // Header
    headerText: white,
    headerBackground: mediumGreen,
    headerDropShadow: darkGreen,

    // Nav Bar (bottom)
    footerBackgroundDefault: mediumGreen,
    footerBackgroundSelected: darkGreen,
    tabIconDefault: beige,
    tabIconSelected: darkBeige,

    // Buttons
    sliderTextDefault: mediumGreen,
    sliderTextSelected: darkGreen,
    sliderBackgroundDefault: beige,
    sliderBackgroundSelected: darkBeige,

    sortButtonText: lightGreen,
    sortButtonBackground: mediumGreen,

    searchBarText: lightGreen,
    searchBarBackground: white,

    // Event Cards
    eventCardText: darkGreen,
    eventCardDescriptionText: black,
    eventCardBackground: beige,
    eventCardDropShadow: mediumGreen,
    eventCardIcon: darkGreen,
    eventCardStarDeselected: darkBeige,
    eventCardStarSelected: yellow,

    eventCardTagText: white,
    eventCardTagBackground: lightGreen,

  },

  dark: {
    // Header
    headerText: white,
    headerBackground: mediumGreen,
    headerDropShadow: darkGreen,

    // Nav Bar (bottom)
    footerBackgroundDefault: mediumGreen,
    footerBackgroundSelected: darkGreen,
    tabIconDefault: beige,
    tabIconSelected: darkBeige,

    // Buttons
    sliderTextDefault: mediumGreen,
    sliderTextSelected: darkGreen,
    sliderBackgroundDefault: beige,
    sliderBackgroundSelected: darkBeige,

    sortButtonText: lightGreen,
    sortButtonBackground: mediumGreen,

    searchBarText: lightGreen,
    searchBarBackground: white,

    // Event Cards
    eventCardText: darkGreen,
    eventCardDescriptionText: black,
    eventCardBackground: beige,
    eventCardDropShadow: mediumGreen,
    eventCardIcon: darkGreen,
    eventCardStarDeselected: darkBeige,
    eventCardStarSelected: yellow,

    eventCardTagText: white,
    eventCardTagBackground: lightGreen,

  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
