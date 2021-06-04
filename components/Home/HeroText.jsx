import React from 'react';
import { Heading, Text, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FormattedMessage } from 'react-intl';

export default function HeroText() {
  return (
    <>
      <Heading as="h1" size="3xl" mb={4}>
        <FormattedMessage id="homepage_question" />
      </Heading>
      <Text fontSize="2xl">
        <FormattedMessage id="homepage_description" />
      </Text>
      <NextLink href="/register">
        <Button mt={4} colorScheme="blue">
          <FormattedMessage id="start_now" />
        </Button>
      </NextLink>
    </>
  );
}
