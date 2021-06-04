import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem as ChakraMenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  IconButton,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa';
import MenuItem from 'components/Navbar/MenuItem';
import NextLink from 'next/link';
import useStateValue from 'hooks/useStateValue';
import { useRouter } from 'next/router';
import stringFormatter from 'utils/stringFormatter';
import { FormattedMessage } from 'react-intl';
import fetcher from 'utils/fetcher';
import Notification from './Notification';

const MenuLinks = ({ isOpen, privateRoute }) => {
  const router = useRouter();
  const [{ user }, dispatch] = useStateValue();
  const [notifcations, setNotifcations] = useState([]);
  const [fullUser, setFullUser] = useState(null);

  useEffect(() => {
    if (user != null) fetchUser();
  }, [user]);

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
    getNotifications(fullUserNew);
  };

  const getNotifications = (usuario) => {
    let pendingEventsNew = usuario.eventos.filter(
      (element) => element.estado === 'pendiente',
    );
    pendingEventsNew = pendingEventsNew.sort(function (a, b) {
      var dateA = new Date(a.fechaCreacion),
        dateB = new Date(b.fechaCreacion);
      return dateB - dateA;
    });
    const top3 = pendingEventsNew.slice(0, 3);
    let notifcaciones = [];
    let creador = 'Alguien';
    let mensaje = '';
    top3.forEach((evento) => {
      if (evento.creador)
        creador = stringFormatter(
          evento.creador.nombre + ' ' + evento.creador.apellido,
          'name',
        );
      let nombre = evento.nombre;
      mensaje = `${creador} te ha invitado a su evento ${nombre}`;
      notifcaciones.push(mensaje);
    });
    console.log(notifcaciones);
    setNotifcations(notifcaciones);
  };

  const logOut = () => {
    dispatch({ type: 'LOG_OUT' });
    localStorage.removeItem('user');
    router.push('/');
  };

  const userProfile = () => {
    router.push('/user');
  };

  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
      mr={14}
    >
      <Stack
        spacing={8}
        align="center"
        justify={[
          'center',
          'space-between',
          'flex-end',
          'flex-end',
          'flex-end',
        ]}
        direction={['column', 'row', 'row', 'row', 'row']}
        mb={3}
      >
        {privateRoute ? (
          <>
            <MenuItem to="/calendar"><FormattedMessage id="menu_calendar"/></MenuItem>
            <MenuItem to="/book"><FormattedMessage id="menu_to_schedule"/></MenuItem>

            {user && (
              <MenuItem to="/user">
                <Text as="b">
                  {stringFormatter(user.nombre + ' ' + user.apellido, 'name')}
                </Text>
              </MenuItem>
            )}

            <Notification notifications={notifcations}></Notification>

            <Menu>
              <MenuButton>
                <Avatar />
              </MenuButton>
              <MenuList>
                <ChakraMenuItem onClick={userProfile}>
                  <FormattedMessage id="menu_profile"/>
                </ChakraMenuItem>
                <ChakraMenuItem onClick={logOut}><FormattedMessage id="menu_logout"/></ChakraMenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <>
            <MenuItem to="/login"><FormattedMessage id="login"/></MenuItem>
            <NextLink href="/register">
              <Button colorScheme="blue"><FormattedMessage id="register"/></Button>
            </NextLink>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default MenuLinks;
