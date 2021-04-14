import { useState, useEffect } from 'react';
import fetcher from 'utils/fetcher';

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
import useStateValue from 'hooks/useStateValue';

const Login = () => {
  const [, dispatch] = useStateValue();

  const [user, setUser] = useState({});

  const [error, setError] = useState(false);
  const router = useRouter();

  const handleChange = (key) => async (event) => {
    setUser({ ...user, [key]: event.target.value });
  };

  const onSubmit = async () => {
    const response = await fetcher('usuarios/login', 'POST', user);

    if (response.error) {
      setError(response.error);
    } else {
      // set user
      dispatch({ type: 'LOG_IN', newUser: response });
      await router.push('/calendar');
    }
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
          <FormLabel mt={1}>Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="tu@gmail.com..."
            onChange={handleChange('email')}
          />
          <FormLabel mt={1}>Contraseña</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="***********"
            onChange={handleChange('password')}
          />

          {error && <FormHelperText color="red">{error}</FormHelperText>}

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