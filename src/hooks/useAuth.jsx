import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import firebaseApp from "../services/firebase";

import { createContext, useContext, useEffect, useState } from "react";
import dbManager from "../services/dbManager";
import { getDatabase, onValue, ref } from "@firebase/database";

export const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const auth = getAuth(firebaseApp);

  // firebase auth에 등록된 user 정보를 불러와서 user state에 넣는 과정
  const handleUser = async (rawUser) => {
    // rawUser must be auth.user
    if (rawUser) {
      // const user = formatUser(rawUser);
      const uid = rawUser.uid;
      let user = { uid: rawUser.uid, email: rawUser.email };
      const userDBInfo = await dbManager.getUserInfo(uid);
      user = { ...user, ...userDBInfo };

      setUser(user);

      return user;
    } else {
      setUser(false);

      return false;
    }
  };

  const signin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      handleUser(user);

      return userCredential;
    } catch (e) {
      handleUser(false);

      return false;
    }
  };
  const signup = async ({ email, password, username }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await dbManager.writeNewUser(user.uid, {
        uid: user.uid,
        email,
        username,
      });
      handleUser(user);

      return user;
    } catch (e) {
      const errorCode = e.code;

      switch (errorCode) {
        case "auth/email-already-in-use":
          break;
        case "auth/weak-password":
          break;
        default:
          break;
      }

      return null;
    }
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        handleUser(false);
      })
      .catch((error) => {
        // An error happened.
        handleUser(false);
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      handleUser(user);
      setIsAuthenticating(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (user !== null) {
      const db = getDatabase(firebaseApp);
      const userRef = ref(db, `users/${user.uid}`);

      const unsubscribe = onValue(userRef, (snapshot) => {
        setUser((user) => ({ ...user, ...snapshot.val() }));
      });

      return () => unsubscribe();
    }
  }, [user]);

  // Return the user object and auth methods
  return {
    user,
    isAuthenticating,
    signin,
    signup,
    signout,
  };
}

export function useAuth() {
  return useContext(authContext);
}
