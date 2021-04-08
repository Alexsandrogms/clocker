import { AuthContext } from 'context/AuthProvider';
import { useContext } from 'react';

export default function useAuth() {
  const { signIn, signUp, signOut } = useContext(AuthContext);

  return { signIn, signUp, signOut };
}
