import { Box, Button, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import BigCalendar from './Calendar';
import useStateValue from 'hooks/useStateValue';

const Calendar = () => {
  const [{ user }] = useStateValue();

  console.log(user);

  return (
    <Box minH="100vh" p={14} mt={14}>
      <Heading mb={4}>Mi Calendario</Heading>

      <NextLink href="/book">
        <Button my={4} colorScheme="blue">
          Agendar un evento
        </Button>
      </NextLink>
      <BigCalendar />
    </Box>
  );
};

export default Calendar;