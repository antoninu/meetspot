import { Box, Button, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import BigCalendar from './Calendar';
import useStateValue from 'hooks/useStateValue';
import { useEffect, useState } from 'react';
import fetcher from 'utils/fetcher';

const Calendar = () => {
  const [{ user }] = useStateValue();
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    const response = await fetcher(
      `usuarios/${user._id}/eventosFuturos`,
      'GET',
    );
    if (response.error) {
      setError(response.error);
    } else {
      //console.log('Eventos: ', response);
      let events = response.map((element) => {
        let elemento = {};
        elemento.start = new Date(element.start);
        elemento.end = new Date(element.end);
        elemento.title = element.title;
        elemento.id = element.id;
        elemento.desc = element.descripcion;
        return elemento;
      });
      //console.log('Con dates: ', events);
      //console.log("type", typeof(events))
      setEventos(events);
    }
  };

  console.log(user);

  return (
    <Box minH="100vh" p={14} mt={14}>
      <Heading mb={4}>Mi Calendario</Heading>

      <NextLink href="/book">
        <Button my={4} colorScheme="blue">
          Agendar un evento
        </Button>
      </NextLink>
      <BigCalendar eventos={eventos} />
    </Box>
  );
};

export default Calendar;
