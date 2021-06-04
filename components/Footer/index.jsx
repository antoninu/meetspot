import React from 'react';
import { Center } from '@chakra-ui/react';
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
      <Section p={5}>
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
