import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

export const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const auth = getAuth();

  const signin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      return user;
    } catch (e) {
      console.log(e);
      setUser(null);
      return null;
    }
  };
  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      return user;
    } catch (e) {
      const errorCode = e.code;
      const errorMessage = e.message;
      console.log(errorCode, errorMessage);
      return null;
    }
  };

  const signout = () => {
    //   return firebase
    //     .auth()
    //     .signOut()
    //     .then(() => {
    //       setUser(false);
    //     });
  };
  const sendPasswordResetEmail = (email) => {
    //   return firebase
    //     .auth()
    //     .sendPasswordResetEmail(email)
    //     .then(() => {
    //       return true;
    //     });
  };
  const confirmPasswordReset = (code, password) => {
    //   return firebase
    //     .auth()
    //     .confirmPasswordReset(code, password)
    //     .then(() => {
    //       return true;
    //     });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}

export function useAuth() {
  return useContext(authContext);
}
