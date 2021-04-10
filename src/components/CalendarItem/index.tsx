import { Box, Text, BoxProps } from '@chakra-ui/react';

interface CalendarProps extends BoxProps {
  time: string;
  unavailable: boolean;
  name: string;
  phone: string;
}

export default function CalendarItem({
  time,
  unavailable,
  name,
  phone,
  ...props
}: CalendarProps) {
  return (
    <Box
      display="flex"
      bg={unavailable ? 'gray.100' : 'gary'}
      border={!unavailable && '1px solid#4E84D5'}
      borderRadius={8}
      p={4}
      alignItems="center"
      mt={4}
      h={103}
      {...props}
    >
      <Box flex={1}>
        <Text
          color="#4E84D4"
          fontSize="2xl"
          lineHeight="25px"
          letterSpacing="0.2em"
          textAlign={unavailable ? 'left' : 'center'}
        >
          {unavailable ? time : `${time} - LIVRE`}
        </Text>
      </Box>
      <Box textAlign="right">
        <Text
          color="#2B3C54"
          fontSize="2xl"
          lineHeight="25px"
          letterSpacing="0.2em"
          fontWeight="bold"
        >
          {name}
        </Text>
        <Text
          color="#2B3C54"
          fontSize="xl"
          lineHeight="25px"
          letterSpacing="0.2em"
        >
          {phone}
        </Text>
      </Box>
    </Box>
  );
}
