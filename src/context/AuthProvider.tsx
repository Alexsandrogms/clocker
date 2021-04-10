import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import { firebaseClient, persistenceMode } from 'config/firebase/client';
import { createProfile } from 'hooks/useFetch';

type AuthContextProps = {
  isToast: boolean;
  toast: ToastProps;
  auth: {
    loading: boolean;
    user: any;
  };
  signIn: ({ email, password }: SignProps) => Promise<String>;
  signUp: ({ email, password }: SignProps) => Promise<void>;
  signOut: () => void;
  notification: ({ status, title, description }?: ToastProps) => void;
  removeNotification: () => void;
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

type ToastProps = {
  status?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [auth, setAuth] = useState({
    loading: true,
    user: null,
  });
  const [isToast, setIsToast] = useState(false);
  const [toast, setToast] = useState({
    title: 'OOPS! algo deu errado.',
    description: 'Algo inesperado aconteceu, tente novamente!',
    status: 'error',
  } as ToastProps);

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

        await createProfile({
          authentication: token,
          username,
        });

        router.push('/');
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

  const notification = useCallback((data: ToastProps) => {
    setToast(data);
    setIsToast(true);
  }, []);

  const removeNotification = () => setIsToast(false);

  useEffect(() => {
    const unsubscribe = firebaseClient.auth().onAuthStateChanged((user) => {
      setAuth({
        loading: false,
        user,
      });
    });

    if (router.route === '/sign-in' && auth.user) {
      router.push('/calendar');
    }

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        isToast,
        toast,
        signIn,
        signUp,
        signOut,
        notification,
        removeNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
