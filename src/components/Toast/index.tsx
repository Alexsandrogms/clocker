import { useContext } from 'react';
import { useToast } from '@chakra-ui/toast';

import { AuthContext } from 'context/AuthProvider';

export default function Toast() {
  const toastBase = useToast();
  const {
    isToast,
    removeNotification,
    toast: { title, description, status },
  } = useContext(AuthContext);

  return (
    <>
      {isToast &&
        toastBase({
          title: title || 'OOPS! algo deu errado.',
          description:
            description || 'Algo inesperado aconteceu, tente novamente!',
          status: status || 'error',
          position: 'top',
          duration: 9000,
          isClosable: true,
          onCloseComplete: removeNotification,
        })}
    </>
  );
}
