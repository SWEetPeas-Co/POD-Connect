// Sets up the app’s global providers (authentication, theme, and fonts)
// and defines the root navigation stack, which loads the tab navigator
// as the main screen and allows additional screens like modals on top of it
// Do not usually touch.

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { AuthProvider } from '@/src/lib/authContext';
import { RsvpProvider } from '@/src/lib/rsvpContext/rsvpContext';
import { FavoritesProvider } from '@/src/lib/favoritesContext/favoritesContext';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

//firebase log out things
import { useContext, useEffect } from "react";
import AuthContext from '@/src/lib/authContext';
import { useRouter } from "expo-router";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router=useRouter();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <AuthProvider>
    <RsvpProvider>
    <FavoritesProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthGate>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="reset-passsword" options={{headerShown: false}}/>
        <Stack.Screen name="verify-email" options={{headerShown: false}}/>
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="create-club-modal" options={{ presentation: 'modal', title: 'Modal', headerShown: false, }} />
      </Stack>
      <StatusBar style="auto" />
      </AuthGate>
    </ThemeProvider>
    </FavoritesProvider>
    </RsvpProvider>
    </AuthProvider>
  );
}
function AuthGate({ children }: { children: React.ReactNode }) {
  const { userLoggedIn, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !userLoggedIn) {
      router.replace("/");
    }
  }, [loading, userLoggedIn]);

  return children;
}
// <Stack.Screen name="create-club-modal" options={{ presentation: 'modal', title: 'Modal', headerShown: false, }} />