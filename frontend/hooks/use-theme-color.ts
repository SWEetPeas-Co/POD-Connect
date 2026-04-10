/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useThemeContext } from '@/src/lib/themeContext/theme-context';

type ColorKey = keyof typeof Colors.light & keyof typeof Colors.dark & keyof typeof Colors.colorblind;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorKey
) {
  const { mode } = useThemeContext();

  // props only has light/dark overrides, colorblind falls through to Colors
  const colorFromProps = mode === 'colorblind' ? undefined : props[mode];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[mode][colorName];
  }
}

// import { Colors } from '@/constants/theme';
// import { useColorScheme } from '@/hooks/use-color-scheme';

// export function useThemeColor(
//   props: { light?: string; dark?: string },
//   colorName: keyof typeof Colors.light & keyof typeof Colors.dark
// ) {
//   const theme = useColorScheme() ?? 'light';
//   const colorFromProps = props[theme];

//   if (colorFromProps) {
//     return colorFromProps;
//   } else {
//     return Colors[theme][colorName];
//   }
// }
