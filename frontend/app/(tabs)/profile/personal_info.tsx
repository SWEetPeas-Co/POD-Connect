// This is for personal info

import { StyleSheet, ScrollView, Pressable, Image, Modal, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight, Camera, Edit } from "lucide-react-native";
import * as ImagePicker from 'expo-image-picker';

import Header from "@/components/header";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from '@/constants/theme';
import { useThemeContext } from "@/src/lib/themeContext/theme-context";
import EditPersonalInfoModal from "@/app/edit-personal-info-modal";

import { auth } from '../../../src/lib/firebase';
import { deleteAccount } from "../../../src/lib/auth";
import { uploadProfileImage } from "@/src/lib/uploadProfileImage";

type UserProfile = {
  firebaseUid: string;
  email: string;
  createdAt: string;
  name: string;
  profileImage?: string;
  isAdmin?: boolean;
  password: string; // Only for editing purposes, not stored in DB
};


export default function PersonalInfo() {
  const { mode } = useThemeContext();
  const theme = Colors[mode];
  const router = useRouter();
  const user = auth.currentUser;
  const email = user?.email || "No email";
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [personalInfo, setPersonalInfo] = useState<UserProfile | null>(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (personalInfo?.profileImage) {
      setProfileImage(personalInfo.profileImage);
    }
  }, [personalInfo]);
  
const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access photos is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (result.canceled || !result.assets?.length) return;

    const localUri = result.assets[0].uri;

    try {
      // 1. Upload to Firebase Storage
      const downloadUrl = await uploadProfileImage(localUri, user!.uid);
      if (!downloadUrl) throw new Error("Cloud upload failed");

      // 2. Update MongoDB
      // Ensure the keys here (name, email, profileImage) match your UserRoutes.js
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/${user!.uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: personalInfo?.name || "",
          email: email,
          profileImage: downloadUrl, // This key must match your backend $set logic
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`MongoDB update failed: ${errorText}`);
      }

      // 3. Update UI and Local State ONLY after DB success
      setProfileImage(downloadUrl);
      setPersonalInfo(prev =>
        prev ? { ...prev, profileImage: downloadUrl } : prev
      );

    } catch (err) {
      console.error("Upload/Update process failed:", err);
    }
  };

  const fetchUserProfile = async () => {
    if (!user) return null;
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/${user.uid}`);
    const data = await response.json();
    
    return data as UserProfile;
  };
  const isGlobalAdmin = personalInfo?.isAdmin === true;

  //this fetchs the user's personal info from the backend
  useEffect(() => {
  if (user) {
    fetchUserProfile().then(setPersonalInfo);
  }
  }, [user]);

 const handleDelete = async (password: string) => {
    try {
      await deleteAccount(password);
      // maybe sign out or navigate
    } catch (err) {
      console.log(err);
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

          {/* Profile Picture Section - FIXED LOGIC */}
          <ThemedView style={styles.profilePicSection}>
            <ThemedView style={styles.avatarWrapper}>
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : require('@/assets/images/default-profile.png')
                }
                style={styles.avatar}
              />
              <Pressable
                style={[styles.cameraButton, { backgroundColor: theme.eventCardBackground }]}
                onPress={handlePickImage}
              >
                <Camera size={14} color={theme.eventCardText} />
              </Pressable>
            </ThemedView>
            <Pressable onPress={handlePickImage}>
              <ThemedText type="eventTitle">Edit Photo</ThemedText>
            </Pressable>
          </ThemedView>

          <ThemedText type="eventTitle">Personal Info</ThemedText>
            {isGlobalAdmin && (
              <ThemedText type="eventTitle">Admin</ThemedText>
            )}
          <ThemedView style={styles.info}>
            
            <ThemedView style={styles.leftInfo}>
              <ThemedText type="eventTitle">Name:</ThemedText>
              <ThemedText type="eventTitle">Email:</ThemedText>
              <ThemedText type="eventTitle">Password:</ThemedText>
            </ThemedView>

            {/* This section has the user's personal information from firebase, replace */}
            <ThemedView style={styles.rightInfo}>
              <ThemedText type="eventTitle">{personalInfo?.name || 'Not provided'}</ThemedText>
              <ThemedText type="eventTitle">{email}</ThemedText>
              <ThemedText type="eventTitle">"*******"</ThemedText>
            </ThemedView>
          </ThemedView>

        </ThemedView>

        <Pressable
          onPress={() => setVisible(true)} // Opens the edit modal
          style={[styles.infoContainer, { backgroundColor: theme.eventCardBackground, shadowColor: theme.eventCardDropShadow, shadowRadius: 1, shadowOffset: { width: 3, height: 4 } }]}
        >
          <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <ThemedText type="eventTitle">Edit Personal Info</ThemedText>
            <ArrowRight size={20} color={theme.eventCardText} />
          </ThemedView>
        </Pressable>

        <ThemedView style={[styles.dashedLine, { borderColor: theme.eventCardDropShadow, backgroundColor: 'transparent' }]} />
        <Pressable onPress={() => setDeleteVisible(true)}>
        <ThemedView style={[styles.infoContainer, { backgroundColor: theme.eventCardBackground, shadowColor: theme.eventCardDropShadow, shadowRadius: 1, shadowOffset: { width: 3, height: 4 } }]}>
          <ThemedText type="eventTitle">Delete Account</ThemedText>
        </ThemedView>
        </Pressable>
      </ScrollView>

      <EditPersonalInfoModal
        visible={isVisible} // You can manage this state to show/hide the modal
        onClose={() => setVisible(false)}
        personalInfo={personalInfo}
      />

      <DeleteAccountModal
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}
        onSubmit={handleDelete}
        theme={theme}
      />

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
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "85%",
    padding: 20,
    borderRadius: 12,
  },
  closeButton: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 4,
  },
  input: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  deleteButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});

type DeleteAccountModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  theme: any; // or your theme type
};


function DeleteAccountModal({
  visible,
  onClose,
  onSubmit,
  theme,
}: DeleteAccountModalProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onSubmit(password);
  };


  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <ThemedView style={[styles.modalBox, { backgroundColor: theme.background }]}>
          
          

          <ThemedText type="eventTitle">Delete Account</ThemedText>

          <ThemedText style={{ marginTop: 10 }}>
            Deleting your account will permanently remove your profile and any clubs you are the sole admin in.
          </ThemedText>

          <TextInput
            placeholder="Re-enter your password"
            placeholderTextColor={theme.eventCardDropShadow}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={[
              styles.input,
              { borderColor: theme.eventCardDropShadow, color: theme.eventCardText }
            ]}
          />

          <Pressable style={[styles.deleteButton, { backgroundColor: theme.eventCardDropShadow }]} onPress={handleSubmit}>
            <ThemedText style={{ color: "white" }}>Confirm Delete</ThemedText>
          </Pressable>
          <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          <Pressable onPress={onClose} style={{ marginTop: 10 }}>
            <ThemedText>Cancel</ThemedText>
          </Pressable>
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
}