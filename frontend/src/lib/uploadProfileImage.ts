import { storage } from "@/src/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadProfileImage(localUri: string, userId: string) {
  const response = await fetch(localUri);
  const blob = await response.blob();

  const filename = `${userId}_${Date.now()}.jpg`;
  const storageRef = ref(storage, `profiles/${filename}`);

  await uploadBytes(storageRef, blob);
  return await getDownloadURL(storageRef);
}