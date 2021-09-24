import { fireStore } from "../services/firebase";
import {
  doc,
  setDoc,
  getDocs,
  where,
  collection,
  query,
  runTransaction,
} from "firebase/firestore";
import { getToday } from "../contexts/DateContext";

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
    } catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }
  }

  async deleteTodo(todo) {
    console.log("deleteTodo", todo);
  }

  async commit(todo, commit) {
    console.log("storeManager", "commit");

    const todoRef = doc(fireStore, "todos", todo.title);
    try {
      await runTransaction(fireStore, async (transaction) => {
        const doc = await transaction.get(todoRef);
        if (!doc.exists()) {
          throw "Document does not exist!";
        }

        const currentTodo = doc.data();
        const currentCommit = currentTodo.commits;
        console.log("current Commit", currentCommit);

        transaction.update(todoRef, {
          ...currentTodo,
          commits: { ...currentCommit, [getToday()]: commit },
        });
      });
      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  }
}
