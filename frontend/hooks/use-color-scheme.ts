//export { useColorScheme } from 'react-native';
import { useThemeContext } from '@/src/lib/themeContext/theme-context';

export function useColorScheme() {
  const { mode } = useThemeContext();
  return mode === 'colorblind' ? 'light' : mode;
}