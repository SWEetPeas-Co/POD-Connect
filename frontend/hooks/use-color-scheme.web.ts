import { useThemeContext } from '@/src/lib/themeContext/theme-context';

export function useColorScheme() {
  const { mode } = useThemeContext();
  return mode === 'colorblind' ? 'light' : mode;
}

// import { useEffect, useState } from 'react';
// import { useColorScheme as useRNColorScheme } from 'react-native';


/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
// export function useColorScheme() {
//   const [hasHydrated, setHasHydrated] = useState(false);

//   //const colorScheme = useRNColorScheme();

//   useEffect(() => {
//     setHasHydrated(true);
//   }, []);

//   const colorScheme = 'light'; // this is whee=re it changes mode

//   //if (hasHydrated) {
//     //return colorScheme;
//   //}

//   //return 'light';

//   return hasHydrated ? colorScheme ?? 'light' : 'light';
// }
