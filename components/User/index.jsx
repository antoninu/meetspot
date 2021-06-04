import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Avatar,
  Grid,
  GridItem,
  MenuList,
  MenuItem,
  Link,
  Text,
  Stack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import useStateValue from 'hooks/useStateValue';
import fetcher from 'utils/fetcher';
import stringFormatter from 'utils/stringFormatter';
import Statistics from './Statistics';
import Invitations from './Invitations';

function User(props) {
  const [{ user }] = useStateValue();
  const [fullUser, setFullUser] = useState(null);
  const [subView, setSubView] = useState('inv');
  const [pendingEvents, setPendingEvents] = useState([]);

  const fetchUser = async () => {
    console.log(user);
    const fullUserNew = await fetcher(`usuarios/${user._id}`, 'GET');
    console.log(fullUserNew);
    setFullUser(fullUserNew);
    getPendingEvents(fullUserNew);
  };

  const handleInv = () => {
    setSubView('inv');
  };

  const handleStat = () => {
    setSubView('stat');
  };

  const getPendingEvents = (user) => {
    const pendingEventsNew = user.eventos.filter(
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
        <Grid
          h="150px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={4}
          mb={10}
        >
          <GridItem rowSpan={2} colSpan={1} align="end">
            <Box verticalAlign="sub">
              <Avatar size="2xl"></Avatar>
            </Box>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Heading>
              {stringFormatter(
                fullUser.nombre + ' ' + fullUser.apellido,
                'name',
              )}
            </Heading>
            {fullUser.correo}
          </GridItem>
          <GridItem colSpan={1}>
            <NextLink href="/calendar">
              <Button colorScheme="blue">Ver calendario</Button>
            </NextLink>
          </GridItem>
        </Grid>
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
                Invitaciones{' '}
                <span style={{ color: '#718096 !important' }}>
                  {pendingEvents.length}
                </span>
              </Text>
            </Link>
            <Link onClick={handleStat}>
              <Text display="block">Estadisticas</Text>
            </Link>
          </Stack>

          <hr></hr>
        </Box>
        {subView === 'inv' ? (
          <Invitations eventos={pendingEvents}>Invitaciones</Invitations>
        ) : (
          <Statistics></Statistics>
        )}
      </Box>
    )
  );
}

export default User;
