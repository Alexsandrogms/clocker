import { useRouter } from 'next/router';
import { ElementType, useEffect, useState } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

import firebase from 'config/firebase';

export default function withAuth(WrapperComponent: ElementType) {
  const Wrapper = (props: unknown) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!firebase.auth().currentUser) router.replace('/');
      setLoading(false);
    }, []);

    if (loading) {
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
