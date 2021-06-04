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
        mt={14}
        borderRadius={14}
        textAlign="center"
      >
        <Heading mb={4} as="h1">
          Registro
        </Heading>
        <FormControl id="signup">
          <FormLabel id="name-label">Nombre</FormLabel>
          <Input
            type="name"
            placeholder="Nombre..."
            onChange={handleChange('nombre')}
            id="name"
          />
          <FormLabel mt={1} id="surname-label">
            Apellido
          </FormLabel>
          <Input
            type="name"
            placeholder="Apellido..."
            onChange={handleChange('apellido')}
            id="surname"
          />
          <FormLabel mt={1} id="email-label">
            Correo Electrónico
          </FormLabel>
          <Input
            type="email"
            placeholder="Correo..."
            onChange={handleChange('correo')}
            id="email"
          />
          <FormLabel mt={1} id="password-label">
            Contraseña
          </FormLabel>
          <Input
            type="password"
            placeholder="***********"
            onChange={handleChange('contrasena')}
            id="password"
          />
          <PasswordStrengthBar
            password={userData.contrasena}
            shortScoreWord={
              userData.contrasena ? 'La contraseña es muy corta' : ''
            }
            scoreWords={['Muy débil', 'Débil', 'Aceptable', 'Bien', 'Fuerte']}
          />
          <FormLabel mt={1} id="repeat-password-label">
            Repite la contraseña
          </FormLabel>
          <Input
            type="password"
            placeholder="***********"
            onChange={handleChange('contrasena_rep')}
            id="repeat-password"
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
