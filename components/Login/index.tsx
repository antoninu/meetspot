import {
  Center,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Link,
  Heading,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const Register = (): JSX.Element => {
  return (
    <Center h="100vh">
      <Box
        borderWidth="2px"
        px={14}
        py={7}
        borderRadius={14}
        textAlign="center"
      >
        <Heading mb={4}>Iniciar sesión</Heading>
        <FormControl id="login">
          <FormLabel mt={1}>Correo Electrónico</FormLabel>
          <Input type="email" placeholder="Correo..." />
          <FormLabel mt={1}>Contraseña</FormLabel>
          <Input type="password" placeholder="***********" />

          <NextLink href="/calendar">
            <Button width="100%" mt={4} type="submit" colorScheme="blue">
              Ingresar
            </Button>
          </NextLink>

          <Center>
            <FormHelperText>
              Si no tienes una cuenta, puedes registrarte{' '}
              <NextLink href="/register" passHref>
                <Link textDecoration="underline">aquí</Link>
              </NextLink>
            </FormHelperText>
          </Center>
        </FormControl>
      </Box>
    </Center>
  );
};

export default Register;
