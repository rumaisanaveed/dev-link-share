import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import type { LinkItem } from "../pages/Home";
import { auth, db } from "../firebase/config";

export async function saveLinks(links: LinkItem[]) {
  const uid = auth.currentUser?.uid;

  if (!uid) throw new Error("User not logged in");

  const linksRef = collection(db, "users", uid, "links");

  const snapshot = await getDocs(linksRef);

  await Promise.all(snapshot.docs.map((doc) => deleteDoc(doc.ref)));

  await Promise.all(
    links.map((link, index) =>
      addDoc(linksRef, {
        platform: link.platform,
        url: link.url,
        order: index,
      }),
    ),
  );
}

export async function getLinks(uid: string): Promise<LinkItem[]> {
  // const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error("User not logged in.");
  }

  const linksRef = collection(db, "users", uid, "links");

  const q = query(linksRef, orderBy("order"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    platform: doc.data().platform,
    url: doc.data().url,
  }));
}
