import React from 'react';
import { Center, Heading, Text } from '@chakra-ui/react';
import Section from 'components/shared/Section';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

export default function Footer() {
  const { locale } = useRouter();

  let spanish = false;

  if (locale.includes('es-')) {
    spanish = true;
  }

  return (
    <footer>
      <hr />
        <Text mb={2}>Not necessary for now.</Text>
      <Section p={5}>
        <Center>© 2021 Meetspot. <FormattedMessage id="rights" /></Center>
        <Center>
          <Link href="#" locale={spanish ? 'en' : 'es-CO'}>
            {spanish ? 'English' : 'Español'}
          </Link>
        </Center>
      </Section>
    </footer>
  );
}
