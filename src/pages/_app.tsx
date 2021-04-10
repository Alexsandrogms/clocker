import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from 'context/AuthProvider';

import Toast from 'components/Toast'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
        <Toast />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
