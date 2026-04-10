// This is for personal info

import { StyleSheet, ScrollView, Pressable, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ArrowLeft, Camera } from "lucide-react-native";
import * as ImagePicker from 'expo-image-picker';

import Header from "@/components/header";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from '@/constants/theme';
import { useThemeContext } from "@/src/lib/themeContext/theme-context";

export default function PersonalInfo() {
  const { mode } = useThemeContext();
  const theme = Colors[mode];
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access photos is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ThemedView style={[styles.mainContainer, { backgroundColor: theme.background }]}>
        
      <Header title="PROFILE" />
        
      <ThemedView style={styles.backContainer}>
        <Pressable style={styles.backButton} onPress={() => router.push('../profile')}>
          <ArrowLeft size={20} color={theme.eventCardText} />
          <ThemedText type="eventSubtitle">Main Menu</ThemedText>
        </Pressable>
      </ThemedView>

      <ScrollView style={styles.eventContainer} contentContainerStyle={styles.eventContent}>
        <ThemedView style={[styles.infoContainer, { backgroundColor: theme.eventCardBackground, shadowColor: theme.eventCardDropShadow, shadowRadius: 1, shadowOffset: { width: 3, height: 4 } }]}>

          {/* Profile Picture Section */}
          <ThemedView style={styles.profilePicSection}>
            <ThemedView style={styles.avatarWrapper}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatar} />
              ) : (
                <ThemedView style={[styles.avatarPlaceholder, { backgroundColor: theme.eventCardDropShadow }]}>
                  <ThemedText style={styles.avatarInitials}>PC</ThemedText>
                </ThemedView>
              )}
              <Pressable
                style={[styles.cameraButton, { backgroundColor: theme.eventCardBackground }]}
                onPress={handlePickImage}
              >
                <Camera size={14} color={theme.eventCardText} />
              </Pressable>
            </ThemedView>
            <ThemedText type="eventSubtitle">Edit photo</ThemedText>
          </ThemedView>

          <ThemedText type="eventTitle">Personal Info</ThemedText>

          <ThemedView style={styles.info}>
            <ThemedView style={styles.leftInfo}>
              <ThemedText type="eventTitle">Name:</ThemedText>
              <ThemedText type="eventTitle">Email:</ThemedText>
              <ThemedText type="eventTitle">Username:</ThemedText>
              <ThemedText type="eventTitle">Password:</ThemedText>
            </ThemedView>

            {/* This section has the user's personal information from firebase, replace */}
            <ThemedView style={styles.rightInfo}>
              <ThemedText type="eventTitle">Name</ThemedText>
              <ThemedText type="eventTitle">Email</ThemedText>
              <ThemedText type="eventTitle">Username</ThemedText>
              <ThemedText type="eventTitle">Password</ThemedText>
            </ThemedView>
          </ThemedView>

        </ThemedView>

        <ThemedView style={[styles.infoContainer, { backgroundColor: theme.eventCardBackground, shadowColor: theme.eventCardDropShadow, shadowRadius: 1, shadowOffset: { width: 3, height: 4 } }]}>
          <ThemedText type="eventTitle">Edit Personal Info</ThemedText>
        </ThemedView>

        <ThemedView style={[styles.dashedLine, { borderColor: theme.eventCardDropShadow, backgroundColor: 'transparent' }]} />

        <ThemedView style={[styles.infoContainer, { backgroundColor: theme.eventCardBackground, shadowColor: theme.eventCardDropShadow, shadowRadius: 1, shadowOffset: { width: 3, height: 4 } }]}>
          <ThemedText type="eventTitle">Delete Account</ThemedText>
        </ThemedView>
      </ScrollView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 85,
    gap: 15,
  },
  backContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 50,
    backgroundColor: 'transparent',
  },
  eventContainer: {
    flex: 1,
    width: '100%',
  },
  eventContent: {
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 50,
    paddingBottom: 100,
  },
  infoContainer: {
    width: '100%',
    borderRadius: 15,
    padding: 20,
    gap: 10,
    shadowRadius: 1,
    shadowOffset: { width: 3, height: 4 },
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftInfo: {
    alignItems: "flex-end",
    minWidth: '10%',
    gap: 10,
  },
  rightInfo: {
    paddingLeft: 30,
    flex: 1,
    gap: 10,
  },
  dashedLine: {
    width: '100%',
    borderBottomWidth: 4,
    borderStyle: 'dashed',
    margin: 15,
  },
  profilePicSection: {
    alignItems: 'center',
    gap: 6,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  avatarWrapper: {
    position: 'relative',
    width: 88,
    height: 88,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  avatarPlaceholder: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: '500',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.15)',
  },
});

// import { StyleSheet, ScrollView, Pressable } from "react-native";
// import { useRouter } from "expo-router";
// import { ArrowLeft } from "lucide-react-native";

// import Header from "@/components/header";
// import { ThemedView } from "@/components/themed-view";
// import { ThemedText } from "@/components/themed-text";
// import { Colors } from '@/constants/theme';
// import { useColorScheme } from '@/hooks/use-color-scheme';

// import ColorModeSwitcher from "@/components/ui/color-switch-button";
// import { useThemeContext } from "@/src/lib/themeContext/theme-context";

// import { Camera } from "lucide-react-native";
// import { Image } from "react-native";

// export default function PersonalInfo() {
//   //const colorScheme = useColorScheme();
//   //const theme = Colors[colorScheme ?? 'light'];
//   const { mode } = useThemeContext();
//   const theme = Colors[mode];
  
//   const router = useRouter();


//   return (
//     <ThemedView style={[styles.mainContainer, { backgroundColor: theme.background } ]}>
        
//         <Header title="PROFILE" />
        
//         <ThemedView style={styles.backContainer}>
//             <Pressable style={styles.backButton} onPress={() => router.push('../profile')} >
//                 <ArrowLeft size={20} color={theme.eventCardText} />
//                 <ThemedText type="eventSubtitle">Main Menu</ThemedText>
//             </Pressable>
//         </ThemedView>

//       <ScrollView style={styles.eventContainer} contentContainerStyle={styles.eventContent}>
//         <ThemedView style={[styles.infoContainer, {backgroundColor: theme.eventCardBackground, shadowColor: theme.eventCardDropShadow, shadowRadius: 1,shadowOffset: { width: 3, height: 4 },},]}>

      
//             <ThemedText type="eventTitle">Personal Info</ThemedText>
//             <ThemedText> For personal info settings like passwords </ThemedText>

//             <ThemedView style={styles.info}>
//               <ThemedView style={styles.leftInfo}>
//                 <ThemedText type="eventTitle">Name:</ThemedText>
//                 <ThemedText type="eventTitle">Email:</ThemedText>
//                 <ThemedText type="eventTitle">Username:</ThemedText>
//                 <ThemedText type="eventTitle">Password:</ThemedText>
//                 <ThemedText type="eventTitle">School ID:</ThemedText>
//               </ThemedView>
//               <ThemedView style={styles.rightInfo}>
//                 <ThemedText type="eventTitle">Name</ThemedText>
//                 <ThemedText type="eventTitle">Email</ThemedText>
//                 <ThemedText type="eventTitle">Username</ThemedText>
//                 <ThemedText type="eventTitle">Password</ThemedText>
//                 <ThemedText type="eventTitle">School ID</ThemedText>
//               </ThemedView>

//             </ThemedView>
        
//         </ThemedView>
//         <ThemedView style={[styles.infoContainer, {backgroundColor: theme.eventCardBackground, shadowColor: theme.eventCardDropShadow, shadowRadius: 1,shadowOffset: { width: 3, height: 4 },},]}>
//             <ThemedText type="eventTitle">Edit Personal Info</ThemedText>
//         </ThemedView>
//         <ThemedView style={[ styles.dashedLine, { borderColor: theme.eventCardDropShadow, backgroundColor: 'transparent' } ]} />
//         <ThemedView style={[styles.infoContainer, {backgroundColor: theme.eventCardBackground, shadowColor: theme.eventCardDropShadow, shadowRadius: 1,shadowOffset: { width: 3, height: 4 },},]}>
//             <ThemedText type="eventTitle">Delete Account</ThemedText>
//         </ThemedView>
//       </ScrollView>

//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     paddingTop: 85,
//     gap: 15,
//   },
//   backContainer: {
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 15,
//     paddingHorizontal: 50,
//     backgroundColor: 'transparent',
//   },
//   eventContainer: {
//     flex: 1,
//     width: '100%',
//   },
//   eventContent: {
//     alignItems: 'center',
//     gap: 30,
//     paddingHorizontal: 50,
//     paddingBottom: 100,
//   },
//   infoContainer: {
//     width: '100%',
//     borderRadius: 15,
//     padding: 20,
//     gap: 10,

//     shadowRadius: 1,
//     shadowOffset: { width: 3, height: 4 },
//   },
//   backButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     alignSelf: "flex-start",
//   },
//   info: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   leftInfo: {
//     alignItems: "flex-end",
//     minWidth: '10%',
//     gap: 10,
//   },
//   rightInfo: {
//     paddingLeft: 30,
//     flex: 1,
//     gap: 10,
//   },
//   dashedLine: {
//     width: '100%',
//     borderBottomWidth: 4,
//     borderStyle: 'dashed',
//     margin: 15,
//   },
// });