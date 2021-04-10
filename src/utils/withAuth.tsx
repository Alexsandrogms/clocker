import { useRouter } from 'next/router';
import { ElementType, useContext, useEffect } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

import { firebaseClient } from 'config/firebase/client';
import { AuthContext } from 'context/AuthProvider';

export default function withAuth(WrapperComponent: ElementType) {
  const Wrapper = (props: unknown) => {
    const router = useRouter();
    const { auth } = useContext(AuthContext);

    useEffect(() => {
      !auth.user && router.push('/');
    }, [auth]);

    if (auth?.loading) {
      return (
        <Flex w="100vw" h="100vh" justify="center" align="center">
          <Spinner size="xl" />
        </Flex>
      );
    }

    return <WrapperComponent {...props} />;
  };

  return Wrapper;
}
