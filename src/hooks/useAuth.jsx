import { getDatabase, set, ref } from "@firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import firebaseApp from "../services/firebase";

import { createContext, useContext, useEffect, useState } from "react";

export const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

const createUser = async (uid, userData) => {
  const db = getDatabase();
  try {
    await set(ref(db, "users/" + uid), { uid, ...userData });
    console.log("createUser success");
  } catch (e) {
    console.log("createUser failed");
    console.log(e);
  }
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const auth = getAuth(firebaseApp);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);

      createUser(user.uid, user);
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
      console.log(e);

      handleUser(null);

      return null;
    }
  };
  const signup = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      // TODO: delete user id when write user data into db fails
      handleUser(user);

      return user;
    } catch (e) {
      const errorCode = e.code;
      const errorMessage = e.message;
      console.log(errorCode, errorMessage);
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
        console.log(error);
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

  // Return the user object and auth methods
  return {
    user,
    isAuthenticating,
    signin,
    signup,
    signout,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    // provider: user.providerData[0].providerId,
    // photoUrl: user.photoURL,
  };
};

export function useAuth() {
  return useContext(authContext);
}
