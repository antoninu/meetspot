import { useState, useEffect } from 'react';
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
import fetcher from 'utils/fetcher';
import useStateValue from 'hooks/useStateValue';
import PasswordStrengthBar from 'react-password-strength-bar';
import { FormattedMessage } from 'react-intl';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Register = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [, dispatch] = useStateValue();
  const toast = useToast();

  useEffect(() => {
    if (userData.correo && !userData.correo.match(emailRegex)) {
      setError('El correo ingresado no es un correo.');
    }
  }, [userData.correo]);

  useEffect(() => {
    if (userData.contrasena !== userData.contrasena_rep) {
      setError('Las contraseñas no coinciden');
    }
  }, [userData.contrasena, userData.contrasena_rep]);

  const handleChange = (key) => async (event) => {
    setError(null);
    setUserData({ ...userData, [key]: event.target.value });
  };

  const handleSubmit = async () => {
    if (process.browser) {
      if (!navigator.onLine) {
        toast({
          title: 'Sin conexión a internet',
          description:
            'Este servicio solo se puede usar con una conexión a internet',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }
    if (
      !userData ||
      !userData.nombre ||
      !userData.apellido ||
      !userData.correo ||
      !userData.contrasena ||
      !userData.contrasena_rep
    )
      return setError('Por favor complete los campos');

    if (userData.contrasena !== userData.contrasena_rep)
      return setError('Las contraseñas no coinciden');

    const response = await fetcher('usuarios/', 'POST', userData);

    if (response.error) {
      setError(response.error);
    } else {
      setError(null);
      const user = {
        apellido: response.apellido,
        nombre: response.nombre,
        correo: response.correo,
        _id: response._id,
      };
      dispatch({ type: 'LOG_IN', newUser: user });
      localStorage.setItem('user', JSON.stringify(user));
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
        <Heading mb={4}><FormattedMessage id="register_title" /></Heading>
        <FormControl id="signup">
          <FormLabel><FormattedMessage id="create_name" /></FormLabel>
          <Input
            type="name"
            placeholder="Nombre..."
            onChange={handleChange('nombre')}
          />
          <FormLabel mt={1}><FormattedMessage id="create_lastname" /></FormLabel>
          <Input
            type="name"
            placeholder="Apellido..."
            onChange={handleChange('apellido')}
          />
          <FormLabel mt={1}><FormattedMessage id="create_email" /></FormLabel>
          <Input
            type="email"
            placeholder="Correo..."
            onChange={handleChange('correo')}
          />
          <FormLabel mt={1}><FormattedMessage id="password" /></FormLabel>
          <Input
            type="password"
            placeholder="***********"
            onChange={handleChange('contrasena')}
          />
          <PasswordStrengthBar
            password={userData.contrasena}
            shortScoreWord={
              userData.contrasena ? 'La contraseña es muy corta' : ''
            }
            scoreWords={['Muy débil', 'Débil', 'Aceptable', 'Bien', 'Fuerte']}
          />
          <FormLabel mt={1}><FormattedMessage id="create_repeat_password" /></FormLabel>
          <Input
            type="password"
            placeholder="***********"
            onChange={handleChange('contrasena_rep')}
          />
          {error && <FormHelperText color="red">{error}</FormHelperText>}

          <Button
            width="100%"
            mt={4}
            type="submit"
            colorScheme="blue"
            onClick={handleSubmit}
            disabled={
              error ||
              !userData ||
              !userData.nombre ||
              !userData.apellido ||
              !userData.correo ||
              !userData.contrasena ||
              !userData.contrasena_rep
            }
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
