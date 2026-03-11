// This document styles the bottom nav bar.

import { Tabs } from 'expo-router'; // Tabs -  component from Expo Router that creates a bottom tab navigation bar.
import React from 'react'; // React - required to use React components.

import { HapticTab } from '@/components/haptic-tab'; // adds vibrations, should be fine to leave (but its optional)
//import { IconSymbol } from '@/components/ui/icon-symbol'; // imports your icon component used inside the tabs. (will not use for simplicity)
import { Colors } from '@/constants/theme'; // imports color scheme
import { useColorScheme } from '@/hooks/use-color-scheme'; // returns light or dark
import { Heart, Send } from "lucide-react-native";

// This creates the bottom navigation bar.
export default function TabLayout() {
  const colorScheme = useColorScheme(); // returns light or dark
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        //tabBarActiveTintColor: Colors[colorScheme ?? 'light'].footerBackgroundSelected, // sets color of active tab
        headerShown: false, // removes top nav header
        tabBarButton: HapticTab, // optional but fine to leave
        
        // controls navbar styling
        tabBarStyle: {
          backgroundColor: theme.footerBackgroundDefault, // Controls the whole bottom bar color.
          borderTopColor: theme.footerBackgroundSelected, // your green line
          borderTopWidth: 3,
          height: 53,
        },
        tabBarActiveBackgroundColor: theme.footerBackgroundSelected,
        tabBarActiveTintColor: theme.tabIconSelected, // icon not used anymore bc of focused
        tabBarInactiveTintColor: theme.tabIconDefault,

        // tabBarItemStyle: {borderRadius: 1, backgroundColor: theme.footerBackgroundSelected }, // adds outline
        // tabBarLabelStyle: {backgroundColor: theme.eventCardDescriptionText,}, // controls text label

        tabBarShowLabel: true, // shows title
      }}>
      <Tabs.Screen
        name="my-events" // file name
        options={{
          title: 'My Events', // shown
          //tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />, // old system
          //tabBarIcon: ({ color }) => ( <House size={28} color={color} /> ),
          tabBarIcon: ({ focused }) => ( <Heart size={28} color={ focused ? theme.tabIconSelected : theme.tabIconDefault } /> ),
        }}
      />
      <Tabs.Screen
        name="discover-clubs"
        options={{
          title: 'Discover',
          //tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />, // old system
          //tabBarIcon: ({ color }) => (<Send size={28} color={color} />),
          tabBarIcon: ({ focused }) => ( <Send size={28} color={ focused ? theme.tabIconSelected : theme.tabIconDefault } /> ),
        }}
      />
    </Tabs>
  );
}
