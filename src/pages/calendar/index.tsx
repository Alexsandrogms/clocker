import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { addDays, subDays } from 'date-fns';

import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Spinner,
} from '@chakra-ui/react';

import useAuth from 'hooks/useAuth';
import withAuth from 'utils/withAuth';
import { CalendarItem, Header, Logo } from 'components';
import { getCalendar } from 'hooks/useFetch';
import { formatDate } from 'utils/utilityFunctions';

type CalendarsData = {
  time: string;
  unavailable: boolean;
  name: string;
  phone: string;
};

function Calendar() {
  const [when, setWhen] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [calendars, setCalendars] = useState([] as CalendarsData[]);

  const { signOut } = useAuth();

  const nextDate = () => setWhen((prevState) => addDays(prevState, 1));
  const prevDate = () => setWhen((prevState) => subDays(prevState, 1));
  const fetch = async () => {
    setLoading(true);
    try {
      const result = await getCalendar({ when });

      setCalendars(result);
    } catch (error) {
      console.log('Error_fnc_getCalendar: ', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch();
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
          <Flex
            justify="center"
            align="center"
            position="fixed"
            left={0}
            top={0}
            right={0}
            h="100vh"
            zIndex={2}
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="gray.500"
              size="xl"
            />
          </Flex>
        )}

        {calendars?.map(({ time, unavailable, name, phone }) => (
          <CalendarItem
            key={time}
            time={time}
            unavailable={unavailable}
            name={name}
            phone={phone}
          />
        ))}
      </Box>
    </Container>
  );
}

export default withAuth(Calendar);
