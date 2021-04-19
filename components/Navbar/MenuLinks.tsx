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
} from '@chakra-ui/react';
import MenuItem from 'components/Navbar/MenuItem';
import NextLink from 'next/link';
import useStateValue from 'hooks/useStateValue';
import { useRouter } from 'next/router';
import stringFormatter from 'utils/stringFormatter';

const MenuLinks = ({ isOpen, privateRoute }) => {
  const router = useRouter();
  const [{ user }, dispatch] = useStateValue();

  const logOut = () => {
    dispatch({ type: 'LOG_OUT' });
    router.push('/');
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
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
      >
        {privateRoute ? (
          <>
            <MenuItem to="/calendar">Calendario</MenuItem>
            <MenuItem to="/book">Agendar</MenuItem>

            {user && (
              <Text as="b">
                {stringFormatter(user.nombre + ' ' + user.apellido, 'name')}
              </Text>
            )}

            <Menu>
              <MenuButton>
                <Avatar />
              </MenuButton>
              <MenuList>
                <ChakraMenuItem onClick={logOut}>Cerrar sesión</ChakraMenuItem>
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
