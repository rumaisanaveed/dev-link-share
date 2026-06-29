import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export async function createUserProfile(uid: string, email: string) {
  await setDoc(doc(db, "users", uid), {
    email,
    username: "",
    firstName: "",
    lastName: "",
    photoURL: "",
    createdAt: new Date(),
  });
}
