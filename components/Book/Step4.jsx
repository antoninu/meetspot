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
  Center,
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
import FaceIcon from 'public/icons/face.svg';

function Step4({ eventData, handleSubmit, invitedList, ruleData }) {
  return (
    <Box>
      <Heading as="h3" size="lg" mb={7} textAlign="center">
        Confirma los datos
      </Heading>
      <Text w={['100%', '100%', '30vw']}>
        El evento <b>{eventData.nombre}</b>, con el fin de{' '}
        <b>{eventData.descripcion}</b>, que tomará curso desde{' '}
        <b>{eventData.diaInicio}</b> hasta <b>{eventData.diaFin}</b>, y con una
        frecuencia <b>{eventData.frecuencia}</b>, los días <b>{ruleData.dia}</b>
        , desde las horas <b>{ruleData.horaInicio}</b> hasta las{' '}
        <b>{ruleData.horaFin}</b>.
      </Text>

      <Text mt={7} width="100%">
        <b>Los invitados son:</b>
      </Text>
      <List spacing={3}>
        {invitedList.length > 0 ? (
          invitedList.map((invitado, id) => (
            <ListItem key={id}>
              <ListIcon as={FaceIcon} color="green.500" h="24px" w="24px" />
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

      <Button
        width="100%"
        mt={7}
        type="submit"
        colorScheme="blue"
        onClick={() => {
          handleSubmit();
        }}
      >
        Agendar
      </Button>
    </Box>
  );
}

export default Step4;
