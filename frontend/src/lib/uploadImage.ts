import { storage } from "@/src/lib/firebase"; // adjust path to your firebase.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadClubImage(localUri: string, clubName: string): Promise<string> {
  const response = await fetch(localUri);
  const blob = await response.blob();

  const filename = `${clubName.trim().replace(/\s+/g, "_")}_${Date.now()}.jpg`;
  const storageRef = ref(storage, `clubs/${filename}`);

  await uploadBytes(storageRef, blob);
  return await getDownloadURL(storageRef);
}