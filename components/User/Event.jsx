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

function Event({ evento }) {
  return (
    <Flex
      direction="column"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      height="200px"
    >
      <Heading as="h4" size="md">
        {stringFormatter(evento.nombre, 'name')}
      </Heading>
      <Text mt="0">{stringFormatter(evento.descripcion, 'text')}</Text>
      <Text>{evento.diaInicio + '-' + evento.diaFin}</Text>
      <Spacer />
      <Flex>
        <ButtonGroup variant="outline" spacing="2">
          <Button colorScheme="blue">Aceptar</Button>
          <Button>Rechazar</Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
}

export default Event;
