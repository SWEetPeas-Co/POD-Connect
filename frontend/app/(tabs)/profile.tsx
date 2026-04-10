// This document outlines the third tab for profile

import { StyleSheet, ScrollView, Pressable } from "react-native";
import { useState, useContext } from "react";

import Header from "@/components/header";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { signOut } from "firebase/auth";
import { auth } from "../../src/lib/firebase";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import ProfileButton from "@/components/profile/profile-button";

import ColorModeSwitcher from "@/components/ui/color-switch-button";
import { useThemeContext } from "@/src/lib/themeContext/theme-context";

export default function MyEvents() {
  //const colorScheme = useColorScheme();
  //const theme = Colors[colorScheme ?? 'light'];
  const { mode } = useThemeContext();
  const theme = Colors[mode];
  const doSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      // If you have an AuthContext, it will auto-redirect
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <ThemedView style={[styles.mainContainer, { backgroundColor: theme.background } ]}>

      <Header title="PROFILE" />

      <ThemedView style={styles.tabContainer}>
        <ProfileButton option="PREFERENCES" href="/profile/preferences" />
        <ProfileButton option="FAV CLUBS" href="/profile/fav_clubs" />
        <ProfileButton option="MY CLUBS" href="/profile/my_clubs" />
        <ProfileButton option="PERSONAL INFO" href="/profile/personal_info" />
      </ThemedView>

      <ScrollView style={styles.eventContainer} contentContainerStyle={styles.eventContent}>
        <ThemedView style={[ styles.dashedLine, { borderColor: theme.eventCardDropShadow, backgroundColor: 'transparent' } ]} />
        <Pressable style={[styles.button, { backgroundColor: theme.logOutButtonBackgroundDefault } ]} onPress={doSignOut}>
            <ThemedText type='eventSubtitle' style={{ color: theme.logOutButtonTextDefult }}>Log Out</ThemedText>
        </Pressable>
      </ScrollView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 100,
    gap: 75,
  },
  tabContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
  },
  eventContainer: {
    flex: 1,
    width: '100%',
  },
  eventContent: {
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  dashedLine: {
    width: '100%',
    borderBottomWidth: 4,
    borderStyle: 'dashed',
    marginBottom: 50,
  },
});