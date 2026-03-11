// This document outlines the third tab for profile

import { StyleSheet, ScrollView } from "react-native";
// import { useState, useContext } from "react";

import Header from "@/components/header";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function MyEvents() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={[styles.mainContainer, { backgroundColor: theme.background } ]}>

      <Header title="PROFILE" />

      <ThemedView style={styles.tabContainer}>
        <ThemedText>Profile Here</ThemedText>
      </ThemedView>

      <ScrollView style={styles.eventContainer} contentContainerStyle={styles.eventContent}>
        <ThemedText>Scroll area here</ThemedText>
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
});