import React from 'react';
import { Center } from '@chakra-ui/react';
import Section from 'components/shared/Section';

export default function Footer() {
  return (
    <footer>
      <hr />
      <Section p={5}>
        <Center>© 2021 Meetspot. Todos los derechos reservados</Center>
      </Section>
    </footer>
  );
}
