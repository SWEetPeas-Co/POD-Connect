import { useState } from 'react';
import { StyleSheet, TextInput, Pressable } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CreateEventModal() {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    // Logic to save the event would go here
    console.log("Event Created:", { eventName, description });
    
    // Close the modal and go back
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="header" style={styles.title}>Create New Event</ThemedText>
      
      <ThemedText style={styles.label}>Event Name</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="e.g. Chess Club Weekly"
        placeholderTextColor="#888"
        value={eventName}
        onChangeText={setEventName}
      />

      <ThemedText style={styles.label}>Description</ThemedText>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="What's happening?"
        placeholderTextColor="#888"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <Pressable style={styles.button} onPress={handleCreate}>
        <ThemedText style={styles.buttonText}>Create Event</ThemedText>
      </Pressable>

      <Pressable style={styles.cancelLink} onPress={() => router.back()}>
        <ThemedText style={{ color: '#ff4444' }}>Cancel</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelLink: {
    marginTop: 20,
    alignItems: 'center',
  },
});

// import { StyleSheet, Pressable, TextInput } from "react-native";
// import { useRouter } from "expo-router";
// import { useState } from "react";

// import { ThemedView } from "@/components/themed-view";
// import { ThemedText } from "@/components/themed-text";

// export default function CreateClubModal() {
//   const router = useRouter();

//   const [clubName, setClubName] = useState("");

//   function handleCreateClub() {
//     console.log("Creating club:", clubName);

//     router.back(); // closes modal
//   }

//   return (
//   <ThemedView style={styles.overlay}>
//     <ThemedView style={styles.modalCard}>
//       <ThemedText type="header">Create Club</ThemedText>

//       <TextInput
//         placeholder="Club Name"
//         value={clubName}
//         onChangeText={setClubName}
//         style={styles.input}
//       />

//       <Pressable style={styles.button} onPress={handleCreateClub}>
//         <ThemedText>Create</ThemedText>
//       </Pressable>

//       <Pressable onPress={() => router.back()}>
//         <ThemedText>Cancel</ThemedText>
//       </Pressable>
//     </ThemedView>
//   </ThemedView>
// );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 25,
//     justifyContent: "center",
//     gap: 20,
//   },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 10,
//   },
//   button: {
//     padding: 12,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   overlay: {
//   flex: 1,
//   backgroundColor: "rgba(0,0,0,0.4)",
//   justifyContent: "center",
//   alignItems: "center",
// },

// modalCard: {
//   width: "85%",
//   padding: 25,
//   borderRadius: 20,
//   backgroundColor: "white",
//   gap: 15,
// },
// });