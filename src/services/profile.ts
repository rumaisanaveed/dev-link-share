import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export async function updateUserProfile(
  username: string,
  photoURL: string = "",
) {
  const user = auth.currentUser;

  if (!user) throw new Error("User not found");

  await updateProfile(user, {
    displayName: username,
    photoURL,
  });

  await updateDoc(doc(db, "users", user.uid), {
    username,
    photoURL,
  });
}
