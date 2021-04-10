import { useEffect, useState } from 'react';
import { addDays, subDays } from 'date-fns';
import { useRouter } from 'next/router';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Flex,
  IconButton,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';

import { Header, Logo, TimeBlock } from 'components';
import { getSchedule } from 'hooks/useFetch';
import { formatDate } from 'utils/utilityFunctions';

function Schedule() {
  const router = useRouter();
  const { schedule } = router.query;

  const [when, setWhen] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [times, setTimes] = useState([]);

  const nextDate = () => setWhen((prevState) => addDays(prevState, 1));
  const prevDate = () => setWhen((prevState) => subDays(prevState, 1));

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await getSchedule(when);
        setTimes(response);
      } catch (error) {
        console.log('Error_fnc_getSchedule: ', error);
      }
      setLoading(false);
    })();
  }, [when]);

  return (
    <Container>
      <Header p={4}>
        <Logo size={160} />
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
      <SimpleGrid p={4} columns={2} spacing={4}>
        {loading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}

        {times?.map((time, idx) => (
          <TimeBlock
            key={idx.toString()}
            time={time}
            date={when}
            username={schedule as string}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Schedule;
