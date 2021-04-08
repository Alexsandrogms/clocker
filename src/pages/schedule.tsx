import { Button, Container, Text } from '@chakra-ui/react';

import useAuth from 'hooks/useAuth';
import withAuth from 'utils/withAuth';

function Schedule() {
  const { signOut } = useAuth();

  return (
    <Container>
      <Button onClick={signOut}>Logout</Button>
      <Text>Agenda</Text>
    </Container>
  );
}

export default withAuth(Schedule);
