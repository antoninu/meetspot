import React from 'react';
import { Heading, Text, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export default function HeroText() {

  return (
    <>
      <Heading as="h1" size="3xl" mb={4}>
        {pageProps.t.homepage_question}
      </Heading>
      <Text fontSize="2xl">
        {pageProps.t.homepage_description}
      </Text>
      <NextLink href="/register">
        <Button mt={4} colorScheme="blue">
          {pageProps.t.start_now}
        </Button>
      </NextLink>

    </>
  );
}
