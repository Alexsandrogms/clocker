import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Flex, Spinner } from '@chakra-ui/react';

import { AuthContext } from 'context/AuthProvider';

export default function Home() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth.loading) {
      auth.user ? router.push('/calendar') : router.push('/sign-in');
    }
  }, [auth.user]);

  return (
    <Flex w="100vw" h="100vh" justify="center" align="center">
      <Spinner size="xl" />
    </Flex>
  );
}
