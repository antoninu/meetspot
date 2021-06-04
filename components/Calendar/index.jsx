import { Box, Button, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import BigCalendar from './Calendar';
import useStateValue from 'hooks/useStateValue';
import { useEffect, useState } from 'react';
import fetcher from 'utils/fetcher';
import BlankSlate from './BlankSlate';

const Calendar = () => {
  const [{ user }] = useStateValue();
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    if (user != undefined) {
      getEvents();
    }
  }, [user]);

  const getEvents = async () => {
    if (navigator.onLine) {
      const response = await fetcher(
        `usuarios/${user._id}/eventosFuturos`,
        'GET',
      );
      if (response.error) {
        setError(response.error);
      } else {
        let events = response.map((element) => {
          let elemento = {};
          elemento.start = new Date(element.start);
          elemento.end = new Date(element.end);
          elemento.title = element.title;
          elemento.id = element.id;
          elemento.desc = element.descripcion;
          return elemento;
        });
        localStorage.setItem('events', JSON.stringify(events));
        setEventos(events);
      }
    } else {
      if (localStorage.getItem('events') === null) {
        setEventos([]);
      } else {
        const storedEvents = JSON.parse(localStorage.getItem('events')).map(
          (element) => {
            let elemento = {};
            elemento.start = new Date(element.start);
            elemento.end = new Date(element.end);
            elemento.title = element.title;
            elemento.id = element.id;
            elemento.desc = element.descripcion;
            return elemento;
          },
        );
        setEventos(storedEvents);
      }
    }
  };

  return (
    <Box
      minH="100vh"
      p={[7, 7, 14]}
      mt={14}
      textAlign={['center', 'center', 'inherit']}
    >
      {eventos.length == 0 ? (
        <BlankSlate></BlankSlate>
      ) : (
        <Bl>
          <Heading mb={4}>Mi Calendario</Heading>
          <NextLink href="/book">
            <Button my={4} colorScheme="blue">
              Agendar un evento
            </Button>
          </NextLink>
          <BigCalendar eventos={eventos} />
        </Bl>
      )}
    </Box>
  );
};

export default Calendar;
