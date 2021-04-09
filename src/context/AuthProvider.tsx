import { createContext, ReactNode, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import { firebaseClient, persistenceMode } from 'config/firebase/client';
import { createProfile } from 'hooks/useFetch';

type AuthContextProps = {
  signIn: ({ email, password }: SignProps) => Promise<String>;
  signUp: ({ email, password }: SignProps) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

type SignProps = {
  email: string;
  password: string;
  username?: string;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  const signIn = useCallback(async ({ email, password }: SignProps) => {
    firebaseClient.auth().setPersistence(persistenceMode);
    try {
      await firebaseClient.auth().signInWithEmailAndPassword(email, password);

      return await firebaseClient.auth().currentUser.getIdToken();
    } catch (error) {
      console.log('Error_fnc_signIn: ', error);
    }
  }, []);

  const signUp = useCallback(
    async ({ email, password, username }: SignProps) => {
      try {
        await firebaseClient
          .auth()
          .createUserWithEmailAndPassword(email, password);
        const token = await signIn({ email, password });

        const data = await createProfile({
          authentication: token,
          username,
        });

        console.log(data);
      } catch (error) {
        console.log('Error_fnc_signUp: ', error);
      }
    },
    []
  );

  const signOut = useCallback(() => {
    firebaseClient.auth().signOut();
    router.replace('/');
  }, []);

  useEffect(() => {
    if (router.pathname === '/') {
      firebaseClient
        .auth()
        .onAuthStateChanged((user) => user && router.push('/calendar'));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
