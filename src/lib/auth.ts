import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  User,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

const INITIAL_USER_CONTEXT = {
  user: null,
};

export const UserContext = createContext<AppAuthContext>(INITIAL_USER_CONTEXT);

type AppAuthContext = {
  /**
   * A Firebase Auth user object.
   */
  user: User | null;
};

/**
 * A custom hook used to manage the current auth session.
 */
export function useAuth() {
  const [authContext, setAuthContext] =
    useState<AppAuthContext>(INITIAL_USER_CONTEXT);
  const updateUser = (user: User | null) => {
    setAuthContext({
      ...authContext,
      user,
    });
  };

  useEffect(() => {
    const auth = getAuth();
    async function signIn() {
      return await signInAnonymously(auth);
    }

    signIn()
      .then((data) => {
        console.log("Signed in anonymously");
        updateUser(data.user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      updateUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user: authContext.user,
    authContext,
  };
}
