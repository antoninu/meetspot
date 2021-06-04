import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import Event from './Event';

function Invitations({ eventos, aceptarEvento, rechazarEvento }) {
  return (
    <SimpleGrid minChildWidth="200px" spacing="40px" p={8}>
      {eventos.map((value, index) => {
        return (
          <Event
            key={index}
            evento={value}
            aceptarEvento={aceptarEvento}
            rechazarEvento={rechazarEvento}
          ></Event>
        );
      })}
    </SimpleGrid>
  );
}

export default Invitations;
