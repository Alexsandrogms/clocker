import { firebaseClient, persistenceMode } from 'config/firebase/client';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useCallback, useEffect } from 'react';

type AuthContextProps = {
  signIn: ({ email, password }: SignProps) => Promise<void>;
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

      // router.push('/schedule');
    } catch (error) {
      console.log('Error_fnc_signIn: ', error);
    }
  }, []);

  const signUp = useCallback(
    async ({ email, password, username }: SignProps) => {
      try {
        const user = await firebaseClient
          .auth()
          .createUserWithEmailAndPassword(email, password);
        await signIn({ email, password });

        console.log(user);

        // createProfile()
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
    firebaseClient
      .auth()
      .onAuthStateChanged((user) => user && router.push('/schedule'));
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
