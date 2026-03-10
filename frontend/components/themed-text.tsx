// This document maps each type of text to a "key" to simplify styling
// It maps color from constants/theme.ts and determines sizing/weights/etc.
// Ex of use: <ThemedText type="header"> Events </ThemedText>

// import Text - React Native text component
// import StyleSheet - tool to define styles
// import TextProps - TypeScript type for allowed text properties
import { StyleSheet, Text, type TextProps } from 'react-native';

// Imports the hook that picks the correct color from your theme.
import { useThemeColor } from '@/hooks/use-theme-color';

import { Fonts } from '@/constants/theme';

// Defining the component's props
// This defines what inputs the component can receive.
// TextProps & means: All normal Text properties + our custom ones
export type ThemedTextProps = TextProps & {
  // Custom overrides here:
  lightColor?: string;
  darkColor?: string;

  // "type" allows preset text styles for different UI roles in the app
  // The "?" means the property is optional
  // These string values are allowed options
  // preset text styles.
  type?:
    | 'header'
    | 'sliderDefault'
    | 'sliderSelected'
    | 'sortButton'
    | 'searchBar'
    | 'eventTitle'
    | 'eventSubtitle'
    | 'eventDescription'
    | 'eventTag';
};

// This maps keys to the colors in constants/theme.ts
const colorMap = {
  header: 'headerText',
  sliderDefault: 'sliderTextDefault',
  sliderSelected: 'sliderTextSelected',
  sortButton: 'sortButtonText',
  searchBar: 'searchBarText',
  eventTitle: 'eventCardText',
  eventSubtitle: 'eventCardText',
  eventDescription: 'eventCardDescriptionText',
  eventTag: 'eventCardTagText',
} as const;

// This defines the actual component function
// This creates a reusable UI component called <ThemedText>
export function ThemedText({
  style,
  // Optional theme overrides
  lightColor,
  darkColor,
  type = 'eventDescription', // Default value for type if none is provided

  // "...rest" collects all remaining props that were passed in
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor }, // manual overrides if provided
    colorMap[type] // fallback theme color key
  );

  return (
    <Text
      style={[
        { color },
        type === 'header' && styles.header, // type === 'link' ? styles.link : undefined,
        type === 'sliderDefault' && styles.sliderDefault,
        type === 'sliderSelected' && styles.sliderSelected,
        type === 'sortButton' && styles.sortButton,
        type === 'searchBar' && styles.searchBar,
        type === 'eventTitle' && styles.eventTitle,
        type === 'eventSubtitle' && styles.eventSubtitle,
        type === 'eventDescription' && styles.eventDescription,
        type === 'eventTag' && styles.eventTag,
        style,
      ]}
      {...rest}
    />
  );
}

// These represent how text looks structurally, not its color. Such as lineHeight, fontSize, fontWeight
const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    //fontWeight: '700',
    fontFamily: Fonts.regular,
  },

  sliderDefault: {
    fontSize: 20,
    //fontWeight: '500',
    fontFamily: Fonts.regular,
  },

  sliderSelected: {
    fontSize: 20,
    //fontWeight: '700',
  },

  sortButton: {
    fontSize: 16,
    //fontWeight: '600',
  },

  searchBar: {
    fontSize: 16,
    fontFamily: Fonts.regular,
  },

  eventTitle: {
    fontSize: 20,
    //fontWeight: '700',
    //lineHeight: 28,
    fontFamily: Fonts.regular,
  },

  eventSubtitle: {
    fontSize: 16,
    //fontWeight: '600',
    //lineHeight: 24,
    fontFamily: Fonts.regular,
  },

  eventDescription: {
    fontSize: 15,
    //lineHeight: 22,
    fontFamily: Fonts.regular,
  },

  eventTag: {
    fontSize: 15,
    //fontWeight: '600',
    fontFamily: Fonts.regular,
  },
});
