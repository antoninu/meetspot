import React from 'react';
import { Center, Img } from '@chakra-ui/react';

export default function Logo() {
  return (
    <Center ml={[0, 14]}>
      <Img
        objectFit="cover"
        src="/images/logo.jpeg"
        alt="MEETSPOT"
        height="75px"
      />
    </Center>
  );
}
