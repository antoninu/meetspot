import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Flex
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import useStateValue from 'hooks/useStateValue';

/**
 * {
    "nombre":"nombre",
    "descripcion": "descripcion",
    "diaInicio": "{{todayDate}}",
    "diaFin": "{{todayDate}}",
    "frecuencia": "diaria",
    "estado": "aceptado",
    "zonaHoraria": "+5",
} 
 */

const Book = () => {
  const router = useRouter();
  const [eventData, setEventData] = useState({});
  const [invitedData, setInvitedData] = useState("");
  const [invitedList, setInvitedList] = useState([]);
  const [error, setError] = useState(null);
  const [, dispatch] = useStateValue();

  //Manejan el estado del evento
  const handleChange = (key) => async (event) => {
    setError(null);
    setEventData({ ...eventData, [key]: event.target.value });
  };

  const handleSubmit = async () => {
    const response = await fetcher('usuarios/', 'POST', eventData);

    if (response.error) {
      setError(response.error);
    } else {
      dispatch({ type: 'LOG_IN', newUser: response });
      await router.push('/calendar');
    }
  };

  //Manejan el estado del usuario a ser invitado
  const handleChangeInvited = () => async (event) => {
    setError(null);
    setInvitedData( event.target.value );
  };

  const handleAddInvited = () => async () => {
    /**const response = await fetcher('usuarios/', 'POST', invitedData);

    if (response.error) {
      setError(response.error);
    } else {
    */
    // Asumiendo que todo esta bien
    handleChangeInvitedList(invitedData);
    //}
  };

  //Manejan el estado de la lista de usuarios a ser invitados
  const handleChangeInvitedList = () => async (event) => {
    setError(null);
    setInvitedList([ ...invitedList, invitedData ]);
    document.getElementById("invited-list").appendChild(
      <Text>{ invitedData }</Text>
    );
  };

  return (
    <Box h="100vh" p={14} mt={14} maxWidth={['100%', '40%']}>
      <Heading mb={4}>Agendar un evento</Heading>

      <FormControl id="signup">
        <FormLabel>Nombre</FormLabel>
        <Input
          type="name"
          placeholder="Nombre..."
          onChange={handleChange('nombre')}
        />

        <FormLabel mt={1}>Descripción</FormLabel>
        <Input
          type="name"
          placeholder="Descripción..."
          onChange={handleChange('descripcion')}
        />

        <FormLabel mt={1}>Día inicio</FormLabel>
        <Input
          type="date"
          placeholder="Día inicio..."
          onChange={handleChange('diaInicio')}
        />

        <FormLabel mt={1}>Día fin</FormLabel>
        <Input
          type="date"
          placeholder="Día fin..."
          onChange={handleChange('diaFin')}
        />

        <FormLabel mt={1}>Frecuencia</FormLabel>
        <Select placeholder="Seleccione una opción">
          <option value="sinRepetir">Sin repetición</option>
          <option value="diaria">Diaria</option>
          <option value="semanal">Semanal</option>
          <option value="mensual">Mensual</option>
        </Select>

        <FormLabel mt={1}>Correos de los usuarios invitados</FormLabel>
        <Flex alignItems="center">
          <Input
            type="email"
            placeholder="Correo invitado..."
            onChange={handleChangeInvited()}
          />
          <Button
              mt={4}
              type="submit"
              colorScheme="blue"
              onClick={handleAddInvited()}
          >
          +
          </Button>
        </Flex>

        <Box id="invited-list">
          <Text>tobia.gasparoni@gmail.com</Text>
          <Text>giomitob@gmail.com</Text>
          <Text>omber84@gmail.com</Text>
        </Box>

        <NextLink href="/calendar">
          <Button
            width="100%"
            mt={4}
            type="submit"
            colorScheme="blue"
            onClick={handleSubmit}
          >
            Siguiente
          </Button>
        </NextLink>
      </FormControl>
    </Box>
  );
};

export default Book;
