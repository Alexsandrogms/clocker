import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { addDays, subDays } from 'date-fns';

import { Box, Button, Container, Flex, IconButton, Spinner } from '@chakra-ui/react';

import useAuth from 'hooks/useAuth';
import withAuth from 'utils/withAuth';
import { Header, Logo } from 'components';
import { getCalendar } from 'hooks/useFetch';
import { formatDate } from 'utils/utilityFunctions';

function Calendar() {
  const [when, setWhen] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const { signOut } = useAuth();

  const nextDate = () => setWhen((prevState) => addDays(prevState, 1));
  const prevDate = () => setWhen((prevState) => subDays(prevState, 1));

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        await getCalendar({ when });
      } catch (error) {
        console.log('Error_fnc_getCalendar: ', error);
      }
    })();
    setLoading(true);
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
      <Box>
        {loading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
      </Box>
    </Container>
  );
}

export default withAuth(Calendar);
