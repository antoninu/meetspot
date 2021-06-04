import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Avatar,
  Grid,
  GridItem,
  Center,
  Link,
  Text,
  Stack,
  useToast,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import useStateValue from 'hooks/useStateValue';
import fetcher from 'utils/fetcher';
import stringFormatter from 'utils/stringFormatter';
import Statistics from './Statistics';
import Invitations from './Invitations';
import { FormattedMessage } from 'react-intl';

function User() {
  const [{ user }] = useStateValue();
  const [fullUser, setFullUser] = useState(null);
  const [subView, setSubView] = useState('inv');
  const [pendingEvents, setPendingEvents] = useState([]);

  const toast = useToast();

  const fetchUser = async () => {
    let fullUserNew;
    if (navigator.onLine) {
      fullUserNew = await fetcher(`usuarios/${user._id}`, 'GET');
      localStorage.setItem('fullUser', JSON.stringify(fullUserNew));
      setFullUser(fullUserNew);
    } else {
      if (localStorage.getItem('fullUser') === null) {
        setFullUser(null);
      } else {
        fullUserNew = JSON.parse(localStorage.getItem('fullUser'));
        setFullUser(fullUserNew);
      }
    }
    console.log(fullUserNew);
    getPendingEvents(fullUserNew);
  };

  const aceptarEvento = async (id) => {
    if (!navigator.onLine) {
      toast({
        title: 'Sin conexión a internet',
        description:
          'Este servicio solo se puede usar con una conexión a internet',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    const response = await fetcher(`eventos/${id}/aceptarEvento`, 'PATCH');
    if (response.error) {
      return toast({
        title: 'Error',
        description: response.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setPendingEvents(pendingEvents.filter((element) => element._id != id));
  };

  const rechazarEvento = async (id) => {
    if (!navigator.onLine) {
      toast({
        title: 'Sin conexión a internet',
        description:
          'Este servicio solo se puede usar con una conexión a internet',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    const response = await fetcher(`eventos/${id}/aceptarEvento`, 'PATCH');
    if (response.error) {
      return toast({
        title: 'Error',
        description: response.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setPendingEvents(pendingEvents.filter((element) => element._id != id));
  };

  const handleInv = () => {
    setSubView('inv');
  };

  const handleStat = () => {
    setSubView('stat');
  };

  const getPendingEvents = (usuario) => {
    const pendingEventsNew = usuario.eventos.filter(
      (element) => element.estado === 'pendiente',
    );
    setPendingEvents(pendingEventsNew);
  };

  useEffect(() => {
    if (user != null) fetchUser();
  }, [user]);

  return (
    fullUser != null && (
      <Box
        minH="100vh"
        p={[7, 7, 14]}
        mt={14}
        textAlign={['center', 'center', 'inherit']}
        alignItems="center"
      >
        <Center flexDirection={['column', 'row']}>
          <Box p={4}>
            <Box verticalAlign="sub">
              <Avatar size="2xl"></Avatar>
            </Box>
          </Box>
          <Box>
            <Box>
              <Heading>
                {stringFormatter(
                  fullUser.nombre + ' ' + fullUser.apellido,
                  'name',
                )}
              </Heading>
              {fullUser.correo}
            </Box>
            <Box my={2}>
              <NextLink href="/calendar">
                <Button colorScheme="blue"><FormattedMessage id="profile_calendar" /></Button>
              </NextLink>
            </Box>
          </Box>
        </Center>
        <Box>
          <Stack
            spacing={8}
            align="center"
            justify={['flex-start', 'flex-start']}
            direction={['row', 'row']}
            mb={3}
          >
            <Link onClick={handleInv}>
              <Text display="block">
                <FormattedMessage id="profile_invitations" />{' '}
                <span style={{ color: '#718096 !important' }}>
                  {pendingEvents.length}
                </span>
              </Text>
            </Link>
            <Link onClick={handleStat}>
              <Text display="block"><FormattedMessage id="profile_statistics" /></Text>
            </Link>
          </Stack>

          <hr></hr>
        </Box>
        {subView === 'inv' ? (
          <Invitations
            eventos={pendingEvents}
            aceptarEvento={aceptarEvento}
            rechazarEvento={rechazarEvento}
          >
            <FormattedMessage id="profile_invitations" />
          </Invitations>
        ) : (
          <Statistics></Statistics>
        )}
      </Box>
    )
  );
}

export default User;
