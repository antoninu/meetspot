import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Calendar from 'components/Calendar/Calendar';
import { useEffect, useState } from 'react';
import useStateValue from 'hooks/useStateValue';
import fetcher from 'utils/fetcher';
import {
  Box,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Flex,
  Comment,
  List,
  ListItem,
  ListIcon,
  MdCheckCircle,
} from '@chakra-ui/react';
import stringFormatter from 'utils/stringFormatter';

const localizer = momentLocalizer(moment);

const now = new Date();

function Step4({ eventData, handleSubmit, invitedList, ruleData }) {
  console.log(eventData);
  console.log(ruleData);

  /**
 * descripcion: "Tobia Raffaele"
diaFin: "2021-04-22"
diaInicio: "2021-04-10"
frecuencia: "sinRepetir"
nombre: "Tobia Raffaele"
 */

  return (
    <div>
      <Heading as="h3" size="lg">
        Paso 4
      </Heading>
      <br></br>
      <Flex alignItems="center">
        <FormLabel mt={1} width="20%">
          Nombre:
        </FormLabel>
        <Text>{eventData.nombre}</Text>
      </Flex>
      <br></br>
      <Flex alignItems="center">
        <FormLabel mt={1} width="20%">
          Descripcion:
        </FormLabel>
        <Text>{eventData.descripcion}</Text>
      </Flex>
      <br></br>
      <Flex alignItems="center">
        <FormLabel mt={1} width="20%">
          Dia inicio:
        </FormLabel>
        <Text>{eventData.diaInicio} </Text>
      </Flex>
      <br></br>
      <Flex alignItems="center">
        <FormLabel mt={1} width="20%">
          Dia fin:
        </FormLabel>
        <Text> {eventData.diaFin}</Text>
      </Flex>
      <br></br>
      <Flex alignItems="center">
        <FormLabel mt={1} width="20%">
          Frecuencia:
        </FormLabel>
        <Text>{eventData.frecuencia}</Text>
      </Flex>
      <br></br>
      <Flex alignItems="center">
        <FormLabel mt={1} width="20%">
          Dia evento:
        </FormLabel>
        <Text> {ruleData.dia}</Text>
      </Flex>
      <br></br>
      <Flex alignItems="center">
        <FormLabel mt={1} width="20%">
          Hora inicio:
        </FormLabel>
        <Text> {ruleData.horaInicio}</Text>
      </Flex>
      <br></br>
      <Flex alignItems="center">
        <FormLabel mt={1} width="20%">
          Hora fin:
        </FormLabel>
        <Text> {ruleData.horaFin}</Text>
      </Flex>
      <br></br>

      <Flex alignItems="center">
        <FormLabel mt={1} width="20%">
          Lista invitados:
        </FormLabel>
        <List spacing={3}>
          {invitedList.length > 0 ? (
            invitedList.map((invitado, id) => (
              <ListItem key={id}>
                <ListIcon as={MdCheckCircle} color="green.500" />
                {invitado
                  ? stringFormatter(
                      invitado.nombre + ' ' + invitado.apellido,
                      'name',
                    ) +
                    ' - ' +
                    invitado.correo
                  : ''}
              </ListItem>
            ))
          ) : (
            <Text>Ninguno</Text>
          )}
        </List>
      </Flex>
      <br></br>
      <Button
        width="100%"
        mt={4}
        type="submit"
        colorScheme="blue"
        onClick={() => {
          handleSubmit();
        }}
      >
        Crear evento
      </Button>
    </div>
  );
}

export default Step4;
