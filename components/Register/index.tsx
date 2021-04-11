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
        <Heading mb={4}>Registro</Heading>
        <FormControl id="signup">
          <FormLabel>Nombre</FormLabel>
          <Input type="name" placeholder="Nombre..." />
          <FormLabel mt={1}>Apellido</FormLabel>
          <Input type="name" placeholder="Apellido..." />
          <FormLabel mt={1}>Correo Electrónico</FormLabel>
          <Input type="email" placeholder="Correo..." />
          <FormLabel mt={1}>Contraseña</FormLabel>
          <Input type="password" placeholder="***********" />
          <FormLabel mt={1}>Repite la contraseña</FormLabel>
          <Input type="password" placeholder="***********" />

          <NextLink href="/calendar">
            <Button width="100%" mt={4} type="submit" colorScheme="blue">
              Registarme
            </Button>
          </NextLink>

          <Center>
            <FormHelperText>
              Si ya tienes una cuenta, puedes ingresar{' '}
              <NextLink href="/login" passHref>
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
