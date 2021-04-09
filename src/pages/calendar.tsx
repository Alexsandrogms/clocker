import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { addDays, subDays } from 'date-fns';

import { Box, Button, Container, Flex, IconButton } from '@chakra-ui/react';

import { Header, Logo } from 'components';
import useAuth from 'hooks/useAuth';
import { formatDate } from 'utils/utilityFunctions';
import withAuth from 'utils/withAuth';
import { getCalendar } from 'utils/getCalendar';

function Calendar() {
  const [when, setWhen] = useState(new Date());
  const { signOut } = useAuth();

  const nextDate = () => setWhen((prevState) => addDays(prevState, 1));
  const prevDate = () => setWhen((prevState) => subDays(prevState, 1));

  useEffect(() => {
    (async () => {
      await getCalendar({ token: '', when });
    })();
  }, [when]);

  return (
    <Container>
      <Header p={4}>
        <Logo size={160} />
        <Button onClick={signOut}>Logout</Button>
      </Header>
      <Flex mt={14} justify="center" align="center">
        <IconButton
          aria-label="Left arrow"
          variant="ghost"
          icon={<ChevronLeftIcon />}
          onClick={prevDate}
        />
        <Box flex={1} textAlign="center">
          {formatDate(when, 'PPPP')}
        </Box>
        <IconButton
          aria-label="Right arrow"
          variant="ghost"
          icon={<ChevronRightIcon />}
          onClick={nextDate}
        />
      </Flex>
    </Container>
  );
}

export default withAuth(Calendar);