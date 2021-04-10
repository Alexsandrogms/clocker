import { useContext } from 'react';
import { useToast } from '@chakra-ui/toast';

import { AuthContext } from 'context/AuthProvider';

export default function Toast() {
  const toastBase = useToast();
  const { isToast, removeNotification, toast } = useContext(AuthContext);

  return (
    <>
      {isToast &&
        toastBase({
          title: toast?.title || 'OOPS! algo deu errado.',
          description: toast?.description || 'Algo inesperado aconteceu, tente novamente!',
          status: toast?.status || 'error',
          position: 'top',
          duration: 9000,
          isClosable: true,
          onCloseComplete: removeNotification,
        })}
    </>
  );
}
