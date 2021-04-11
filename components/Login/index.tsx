import { useState } from 'react';

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
import { useRouter } from 'next/router';

const Login = (): JSX.Element => {
  const [error, setError] = useState(false);
  const router = useRouter();

  const onSubmit = async (): Promise<void> => {
    //TODO haga fetch
    //const response = await fetch.
    //if !response.ok

    setError(true);

    //else si todo salio bien:
    // colocar el objeto user en el estado global

    await router.push('/calendar');
  };

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

          {error && (
            <FormHelperText color="red">
              Hubo un error al ingresar.
            </FormHelperText>
          )}

          <Button
            width="100%"
            mt={4}
            type="submit"
            colorScheme="blue"
            onClick={() => onSubmit()}
          >
            Ingresar
          </Button>

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

export default Login;
