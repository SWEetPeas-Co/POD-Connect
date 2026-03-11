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

// dark mode
const mediumGreenDM = '#249556';
const lightGreenDM = '#98BA7B';
const darkGreenDM = '#4A7E61';
const beigeDM = '#35342B';
const darkBeigeDM = '#D4CEAB';
const lightPinkDM = '#EFD7DD';
const whiteDM = '#FFFFFF';
const blackDM = '#000000';
const yellowDM = '#CCB423';

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

// to dynamically make colors change:
/**
 * Add to top:
 * import { Colors } from '@/constants/theme';
 * import { useColorScheme } from '@/hooks/use-color-scheme';
 * 
 * Add to top of const:
 * const colorScheme = useColorScheme();
 * const theme = Colors[colorScheme ?? 'light'];
 * 
 * In any ThemeView that has hard coded hex, comment and add inline:
 * <ThemedView style={[styles.mainContainer, { backgroundColor: theme.background } ]}>
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

    filterButtonBackgroundDefault: beige,
    filterButtonBackgroundSelected: darkBeige,
    filterButtonIconDefault: mediumGreen,
    filterButtonIconSelected: darkGreen,
    filterTagBackgroundDefault: darkBeige,
    filterTagBackgroundSelected: lightPink,

    rsvpButtonBackgroundDefault: lightGreen,
    rsvpButtonBackgroundSelected: darkGreen,
    rsvpButtonTextDefault: white,
    rsvpButtonTextSelected: white,

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
    // Page
    background: blackDM,

    // Header
    headerText: whiteDM,
    headerBackground: mediumGreenDM,
    headerDropShadow: darkGreenDM,

    // Nav Bar (bottom)
    footerBackgroundDefault: mediumGreenDM,
    footerBackgroundSelected: darkGreenDM,
    tabIconDefault: beigeDM,
    tabIconSelected: darkBeigeDM,

    // Buttons
    sliderTextDefault: mediumGreenDM,
    sliderTextSelected: darkGreenDM,
    sliderBackgroundDefault: beigeDM,
    sliderBackgroundSelected: darkBeigeDM,

    sortButtonText: lightGreenDM,
    sortButtonBackground: mediumGreenDM,

    searchBarText: lightGreenDM,
    searchBarBackground: whiteDM,

    filterButtonBackgroundDefault: beigeDM,
    filterButtonBackgroundSelected: darkBeigeDM,
    filterButtonIconDefault: mediumGreenDM,
    filterButtonIconSelected: darkGreenDM,
    filterTagBackgroundDefault: darkBeigeDM,
    filterTagBackgroundSelected: lightPinkDM,

    rsvpButtonBackgroundDefault: lightGreenDM,
    rsvpButtonBackgroundSelected: darkGreenDM,
    rsvpButtonTextDefault: whiteDM,
    rsvpButtonTextSelected: whiteDM,

    // Event Cards
    eventCardText: darkGreenDM,
    eventCardDescriptionText: blackDM,
    eventCardBackground: beigeDM,
    eventCardDropShadow: mediumGreenDM,
    eventCardIcon: darkGreenDM,
    eventCardStarDeselected: darkBeigeDM,
    eventCardStarSelected: yellowDM,

    eventCardTagText: whiteDM,
    eventCardTagBackground: lightGreenDM,

  },
};

export const Fonts = Platform.select({
  ios: {
    regular: 'Inter_400Regular',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',

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
    regular: 'Inter_400Regular',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',

    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    regular: 'Inter_400Regular',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
    
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
