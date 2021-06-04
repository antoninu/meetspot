import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import Event from './Event';

function Invitations({ eventos }) {
  return (
    <SimpleGrid minChildWidth="200px" spacing="40px" p={8}>
      {eventos.map((value, index) => {
        return <Event key={index} evento={value}></Event>;
      })}
    </SimpleGrid>
    /*<ul>
      {eventos.map((value, index) => {
        return <li key={index}>{value.nombre}</li>;
      })}
    </ul>*/
  );
}

export default Invitations;
