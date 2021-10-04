import { getAuth, onAuthStateChanged } from "@firebase/auth";
import {
  getDatabase,
  ref,
  push,
  child,
  update,
  onValue,
} from "firebase/database";
import firebaseApp from "./firebase";

const TAG = "DBManger";

export class DBManager {
  constructor(firebaseApp) {
    this.app = firebaseApp;
    this.db = getDatabase(firebaseApp);
    this.auth = getAuth(firebaseApp);
    this.user = this.auth.currentUser;
    this.todos = null;

    onAuthStateChanged(this.auth, (user) => {
      console.log("onAuthStateChanged");
      if (user) {
        this.user = user;

        // user 상태가 변할 때마다, todos를 변경, 추적
        const todoRef = ref(this.db, "user-todos/" + this.user.uid);
        onValue(todoRef, (snapshot) => {
          const todos = snapshot.toJSON();
          this.todos = todos;
        });
      } else {
        this.user = false;
      }
    });
  }

  writeNewTodo = (title) => {
    if (!this.user) {
      // login 되지 않았을 때,
      console.log(TAG, "writeNewTodo: user is not logged in.");
    } else {
      const uid = this.user.uid;

      // login 되었을 때,
      const todoData = {
        uid: uid,
        title: title,
        commits: {},
      };

      // Get a key for a new post.
      const newTodoKey = push(child(ref(this.db), "todos")).key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates["/todos/" + newTodoKey] = todoData;
      updates["/user-todos/" + uid + "/" + newTodoKey] = todoData;
      console.log(updates);

      return update(ref(this.db), updates);
    }
  };

  getTodos() {
    // 로그인 되어있을 경우 exception handling
    return this.user ? this.todos : {};
  }
}
const dbManager = new DBManager(firebaseApp);

export default dbManager;
