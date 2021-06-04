import React from 'react';
import { Center, Heading, Text } from '@chakra-ui/react';
import Section from 'components/shared/Section';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Footer() {
  const { locale } = useRouter();

  let spanish = false;

  if (locale.includes('es-')) {
    spanish = true;
  }

  return (
    <footer>
      <hr />
      <Section p={5} textAlign="center">
        <Heading mb={4}>FAQ</Heading>
        <Heading as="h4" size="md">
          Do I have to pay for the service?
        </Heading>
        <Text mb={2}>Not necessary for now.</Text>
        <Heading as="h4" size="md">
          Do my partners need to have an account to access this service?
        </Heading>
        <Text mb={2}>
          Yes they do in order for us to let you know their availabilities.
        </Text>
        <Heading as="h4" size="md">
          Can I load my schedule with my current Google Calendar?
        </Heading>
        <Text mb={10}>
          Not for the moment, but it will be an incoming feature.
        </Text>
        <Center>© 2021 Meetspot. Todos los derechos reservados</Center>
        <Center>
          <Link href="#" locale={spanish ? 'en' : 'es-CO'}>
            {spanish ? 'English' : 'Español'}
          </Link>
        </Center>
      </Section>
    </footer>
  );
}
