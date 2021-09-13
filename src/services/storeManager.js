import { fireStore } from "../services/firebase";
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  where,
  collection,
  query,
} from "firebase/firestore";

export default class StoreManager {
  constructor() {
    console.log("storeManager", "constructor");
  }

  async loadTodos() {
    console.log("StoreManager", "getAllTodos");
    const q = query(collection(fireStore, "todos"), where("title", "!=", null));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return data;
  }

  async addTodo(todoTitle) {
    console.log("addTodo", todoTitle);
    try {
      await setDoc(
        doc(fireStore, "todos", todoTitle),
        {
          title: todoTitle,
          commits: {},
        },
        { merge: true }
      );
      const docRef = doc(fireStore, "todos", todoTitle);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("doc exist", docSnap.data());
        return docSnap.data();
      } else {
        console.log("doc doesn't exist");
        return null;
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }
  }
}
