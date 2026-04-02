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

export default function MyEvents() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
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
        <ThemedText>Profile Here</ThemedText>
      </ThemedView>

      <ScrollView style={styles.eventContainer} contentContainerStyle={styles.eventContent}>
        <ThemedText>Scroll area here</ThemedText>
        <Pressable style={styles.button} onPress={doSignOut}>
            <ThemedText type='eventSubtitle' style={styles.buttonText}>Log Out</ThemedText>
        </Pressable>
      </ScrollView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#98BA7B',
    paddingTop: 85,
    gap: 15,
  },
  tabContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
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
    backgroundColor: "#4A7E61",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
   buttonText: {
    color: "#fff",
  },
});