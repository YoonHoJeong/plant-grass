import { getAuth, onAuthStateChanged } from "@firebase/auth";
import {
  getDatabase,
  ref,
  push,
  child,
  update,
  onValue,
  get,
  set,
} from "firebase/database";
import firebaseApp from "./firebase";
import { getToday } from "../contexts/DateContext";

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

  writeNewCommit = (todoId, commit) => {
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
        date: getToday(),
        title: commit.title,
        content: commit.content,
      };

      const updates = {};
      updates["/commits/" + newCommitKey] = commitData;
      updates["/users/" + this.user.uid + "/todos/commits/" + newCommitKey] =
        commitData;
      updates[
        "/user-todos/" +
          this.user.uid +
          "/" +
          todoId +
          "/commits/" +
          newCommitKey
      ] = commitData;
      updates["/todo-commits/" + todoId + "/" + newCommitKey] = commitData;
      updates["/todos/" + todoId + "/commits/" + newCommitKey] = commitData;

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
        date: getToday(),
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

  updateTodoTitle(todoId, title) {
    if (!this.user) {
      // login 되지 않았을 때,
      console.log(TAG, "writeNewTodo: user is not logged in.");
    } else {
      // login 되었을 때,
      const uid = this.user.uid;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates["/todos/" + todoId + "/title/"] = title;
      updates["/user-todos/" + uid + "/" + todoId + "/title/"] = title;

      return update(ref(this.db), updates);
    }
  }

  async getUserInfo(uid) {
    const userRef = ref(this.db, `users/${uid}`);
    const snapshot = await get(userRef);
    const userDBInfo = snapshot.val();

    return userDBInfo;
  }

  writeNewUser = async (uid, userData) => {
    try {
      await set(ref(this.db, "users/" + uid), { uid, ...userData });
    } catch (e) {
      console.log(e);
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
