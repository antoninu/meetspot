import React from 'react';
import { Heading, Text, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function HeroText() {
  return (
    <>
      <Heading as="h1" size="3xl" mb={4}>
        ¿Cansado de no poder agendar reuniones fácilmente?
      </Heading>
      <Text fontSize="2xl">
        Meetspot puede hacer tu vida más simple ayudandote a encontrar las
        disponibilades en común con tus compañeros y organizar tu agenda.
      </Text>
      <NextLink href="/register">
        <Button mt={4} colorScheme="blue">
          Empezar ya
        </Button>
      </NextLink>
    </>
  );
}
