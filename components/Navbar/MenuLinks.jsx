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
} from '@chakra-ui/react';
import MenuItem from 'components/Navbar/MenuItem';
import NextLink from 'next/link';
import useStateValue from 'hooks/useStateValue';
import { useRouter } from 'next/router';
import stringFormatter from 'utils/stringFormatter';
import Notification from './Notification';

const MenuLinks = ({ isOpen, privateRoute }) => {
  const router = useRouter();
  const [{ user }, dispatch] = useStateValue();

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
            <MenuItem to="/calendar" aria-label="calendar-link">
              Calendario
            </MenuItem>
            <MenuItem to="/book" aria-label="book-link">
              Agendar
            </MenuItem>

            {user && (
              <MenuItem to="/user" aria-label="user-link">
                <Text as="b">
                  {stringFormatter(user.nombre + ' ' + user.apellido, 'name')}
                </Text>
              </MenuItem>
            )}

            <Notification></Notification>

            <Menu>
              <MenuButton aria-label="user-menu-button">
                <Avatar iconLabel="avatar" />
              </MenuButton>
              <MenuList>
                <ChakraMenuItem onClick={userProfile} aria-label="profile-link">
                  Ver perfil
                </ChakraMenuItem>
                <ChakraMenuItem onClick={logOut} aria-label="logout-link">
                  Cerrar sesión
                </ChakraMenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <>
            <MenuItem to="/login">Iniciar sesión</MenuItem>
            <NextLink href="/register">
              <Button colorScheme="blue">¡Regístrate!</Button>
            </NextLink>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default MenuLinks;
