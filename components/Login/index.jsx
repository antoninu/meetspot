import { useState } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import useStateValue from 'hooks/useStateValue';
import { FormattedMessage } from 'react-intl';

const Login = () => {
  const [, dispatch] = useStateValue();

  const [user, setUser] = useState({});

  const [error, setError] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleChange = (key) => async (event) => {
    setUser({ ...user, [key]: event.target.value });
  };

  const onSubmit = async () => {
    if(process.browser){
      if(!navigator.onLine){
        toast({
          title: 'Sin conexión a internet',
          description: 'Este servicio solo se puede usar con una conexión a internet',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }
    const response = await fetcher('usuarios/login', 'POST', user);

    if (response.error) {
      setError(response.error);
    } else {
      // set user
      const user = {'apellido':response.apellido, 'nombre': response.nombre, 'correo':response.correo, '_id':response._id};
      dispatch({ type: 'LOG_IN', newUser: user });
      localStorage.setItem("user", JSON.stringify(user));
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
        <Heading mb={4}><FormattedMessage id="login" /></Heading>
        <FormControl id="login">
          <FormLabel mt={1}>E-mail</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="mail@gmail.com"
            onChange={handleChange('correo')}
          />
          <FormLabel mt={1}><FormattedMessage id="password" /></FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="***********"
            onChange={handleChange('contrasena')}
          />

          {error && <FormHelperText color="red">{error}</FormHelperText>}

          <Button
            width="100%"
            mt={4}
            type="submit"
            colorScheme="blue"
            onClick={() => onSubmit()}
          >
            <FormattedMessage id="enter" />
          </Button>

          <Center>
            <FormHelperText>
              <FormattedMessage id="if_you_dont" />{' '}
              <NextLink href="/register" passHref>
                <Link textDecoration="underline"><FormattedMessage id="here" /></Link>
              </NextLink>
            </FormHelperText>
          </Center>
        </FormControl>
      </Box>
    </Center>
  );
};

export default Login;
