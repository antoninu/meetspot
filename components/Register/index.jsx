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
import fetcher from 'utils/fetcher';
import useStateValue from 'hooks/useStateValue';

const Register = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [, dispatch] = useStateValue();

  const handleChange = (key) => async (event) => {
    setError(null);
    setUserData({ ...userData, [key]: event.target.value });
  };

  const handleSubmit = async () => {
    const response = await fetcher('usuarios/', 'POST', userData);

    if (response.error) {
      setError(response.error);
    } else {
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
        <Heading mb={4}>Registro</Heading>
        <FormControl id="signup">
          <FormLabel>Nombre</FormLabel>
          <Input
            type="name"
            placeholder="Nombre..."
            onChange={handleChange('first_name')}
          />
          <FormLabel mt={1}>Apellido</FormLabel>
          <Input
            type="name"
            placeholder="Apellido..."
            onChange={handleChange('last_name')}
          />
          <FormLabel mt={1}>Correo Electrónico</FormLabel>
          <Input
            type="email"
            placeholder="Correo..."
            onChange={handleChange('email')}
          />
          <FormLabel mt={1}>Contraseña</FormLabel>
          <Input
            type="password"
            placeholder="***********"
            onChange={handleChange('password')}
          />
          <FormLabel mt={1}>Repite la contraseña</FormLabel>
          <Input type="password" placeholder="***********" />

          {error && <FormHelperText color="red">{error}</FormHelperText>}

          <Button
            width="100%"
            mt={4}
            type="submit"
            colorScheme="blue"
            onClick={handleSubmit}
          >
            Registarme
          </Button>

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