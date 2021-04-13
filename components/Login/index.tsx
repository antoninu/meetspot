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

  const onSubmit = () => {
    const correo = (document.getElementById("email") as HTMLInputElement).value;
    const constrasena = (document.getElementById("password") as HTMLInputElement).value;
    let crypto = require('crypto');
    let md5sum = crypto.createHash('md5');
    let hash = md5sum.update(constrasena).digest('hex');
    const body = {"correo": correo, "contrasena": hash};
    const req = new XMLHttpRequest();
    req.open("PUT", 'http://localhost:3001/usuarios/login', true);
    req.setRequestHeader("Content-Type", "application/json");
    req.responseType = "json";
    req.onload = async function() {
      if (req.status == 200) {
        //else si todo salio bien:
        // colocar el objeto user en el estado global
        console.log(req.response[0])
        await router.push('/calendar');
      }
      else {
        setError(true);
      }
    };
    req.send(JSON.stringify(body));
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
          <Input id="email" type="email" placeholder="Correo..." />
          <FormLabel mt={1}>Contraseña</FormLabel>
          <Input id="password" type="password" placeholder="***********" />

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
