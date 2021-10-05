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
    console.log("dbManager mount");
    this.app = firebaseApp;
    this.db = getDatabase(firebaseApp);
    this.auth = getAuth(firebaseApp);
    this.user = this.auth.currentUser;
    this.todos = null;

    onAuthStateChanged(this.auth, (user) => {
      console.log("onAuthStateChanged");
      if (user) {
        this.user = user;
      } else {
        this.user = false;
      }
    });
  }
  syncTodos(onUpdate) {
    // user 상태가 변할 때마다, todos를 변경, 추적
    const todoRef = ref(this.db, "user-todos/" + this.user.uid);
    const unscribe = onValue(todoRef, (snapshot) => {
      const todos = snapshot.toJSON();
      this.todos = todos;
      onUpdate(todos);
    });
    return unscribe;
  }

  deleteTodo = (todoId) => {
    // Write the new post's data simultaneously in the posts list and the user's post list.
    if (!this.user) {
      // login 되지 않았을 때,
      console.log(TAG, "deleteTodo: user is not logged in.");
    } else {
      // login 되었을 때,
      const uid = this.user.uid;

      const updates = {};
      updates["/todos/" + todoId] = null;
      updates["/user-todos/" + uid + "/" + todoId] = null;

      return update(ref(this.db), updates);
    }
  };
  writeNewCommit = (todoId, title, content) => {
    if (!this.user) {
      // login 되지 않았을 때,
      console.log(TAG, "writeNewCommit: user is not logged in.");
    } else {
      // login 되었을 때,

      // Get a key for a new commit.
      const newCommitKey = push(child(ref(this.db), "commits")).key;

      const commitData = {
        id: newCommitKey,
        todoId: todoId,
        title: title,
        content: content,
      };

      const updates = {};
      updates["/commits/" + newCommitKey] = commitData;
      updates["/todo-commits/" + todoId + "/" + newCommitKey] = commitData;

      return update(ref(this.db), updates);
    }
  };

  writeNewTodo = (title) => {
    if (!this.user) {
      // login 되지 않았을 때,
      console.log(TAG, "writeNewTodo: user is not logged in.");
    } else {
      // login 되었을 때,
      const uid = this.user.uid;

      // Get a key for a new post.
      const newTodoKey = push(child(ref(this.db), "todos")).key;

      const todoData = {
        id: newTodoKey,
        uid: uid,
        title: title,
        commits: {},
      };

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates["/todos/" + newTodoKey] = todoData;
      updates["/user-todos/" + uid + "/" + newTodoKey] = todoData;

      return update(ref(this.db), updates);
    }
  };

  getTodos() {
    console.log(TAG, "getTodos");
    // 로그인 되어있을 경우 exception handling
    return this.user ? this.todos : {};
  }
}
const dbManager = new DBManager(firebaseApp);

export default dbManager;
