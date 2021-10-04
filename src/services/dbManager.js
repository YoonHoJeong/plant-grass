import { getDatabase, ref, push, child, update } from "firebase/database";
import firebaseApp from "./firebase";

export class DBManager {
  constructor(firebaseApp) {
    this.app = firebaseApp;
  }

  writeNewTodo = (uid, title) => {
    const db = getDatabase(this.app);

    const todoData = {
      uid: uid,
      title: title,
      commits: {},
    };

    // Get a key for a new post.
    const newTodoKey = push(child(ref(db), "todos")).key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates["/todos/" + newTodoKey] = todoData;
    updates["/user-todos/" + uid + "/" + newTodoKey] = todoData;
    console.log(updates);

    return update(ref(db), updates);
  };
}

export default new DBManager(firebaseApp);
