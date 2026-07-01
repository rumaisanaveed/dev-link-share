import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import type { LinkItem } from "../pages/Home";

export async function getUserByUsername(username: string) {
  const q = query(collection(db, "users"), where("username", "==", username));

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs[0];
}

export async function getPublicLinks(uid: string): Promise<LinkItem[]> {
  const snapshot = await getDocs(collection(db, "users", uid, "links"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<LinkItem, "id">),
  }));
}
