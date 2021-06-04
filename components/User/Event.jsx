import React from 'react';
import stringFormatter from 'utils/stringFormatter';
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Spacer,
  ButtonGroup,
} from '@chakra-ui/react';
import { FormattedDate } from 'react-intl';

function Event({ evento, aceptarEvento, rechazarEvento }) {
  return (
    <Flex
      direction="column"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      minHeight="220px"
    >
      <Heading as="h4" size="md">
        {stringFormatter(evento.nombre, 'name')}
      </Heading>
      <Text mt="0">{stringFormatter(evento.descripcion, 'text')}</Text>
      <Text>
        <FormattedDate
          value={new Date(evento.diaInicio)}
          year="numeric"
          month="long"
          day="numeric"
          weekday="long"
        />
        <FormattedDate
          value={new Date(evento.diaFin)}
          year="numeric"
          month="long"
          day="numeric"
          weekday="long"
        />
      </Text>
      <Spacer />
      <Flex>
        <ButtonGroup variant="outline" spacing="2">
          <Button
            colorScheme="blue"
            onClick={() => {
              aceptarEvento(evento._id);
            }}
          >
            Aceptar
          </Button>
          <Button
            onClick={() => {
              rechazarEvento(evento._id);
            }}
          >
            Rechazar
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
}

export default Event;
