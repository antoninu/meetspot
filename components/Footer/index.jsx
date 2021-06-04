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
      <Section p={5} textAlign="center">
        <Heading mt={14} mb={7}>
          FAQ
        </Heading>
        <Heading as="h5" size="md" mb={4}>
          <FormattedMessage id="FAQ_question1" />
        </Heading>
        <Text>
          <FormattedMessage id="FAQ_answer1" />
        </Text>
        <Heading as="h5" size="md" mb={4}>
          <FormattedMessage id="FAQ_question2" />
        </Heading>
        <Text>
          <FormattedMessage id="FAQ_answer3" />
        </Text>
        <Heading as="h5" size="md" mb={4}>
          <FormattedMessage id="FAQ_question3" />
        </Heading>
        <Text mb={7}>
          <FormattedMessage id="FAQ_answer2" />
        </Text>
        <Center>
          © 2021 Meetspot. <FormattedMessage id="rights" />
        </Center>
        <Center>
          <Link href="#" locale={spanish ? 'en' : 'es-CO'}>
            {spanish ? 'English' : 'Español'}
          </Link>
        </Center>
      </Section>
    </footer>
  );
}
