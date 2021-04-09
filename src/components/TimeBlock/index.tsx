import { Button } from '@chakra-ui/react';

interface TimeBlockProps {
  time: string;
}

const TimeBlock = ({ time }: TimeBlockProps) => (
  <Button p={8} bg="blue.500" color="white">
    {time}
  </Button>
);

export default TimeBlock;
