import { Box, Button, Stack, Text, Avatar } from '@chakra-ui/react';
import MenuItem from 'components/Navbar/MenuItem';
import NextLink from 'next/link';

type Props = {
  isOpen?: boolean;
  privateRoute?: boolean;
};

const MenuLinks = ({ isOpen, privateRoute }: Props): JSX.Element => {
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
            <Text as="b">Nombre Apellido</Text>
            <Avatar />
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
