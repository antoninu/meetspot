import React from 'react';
import { Center, Img } from '@chakra-ui/react';
import Logo from 'public/logo.svg';

export default function LogoSection() {
  return (
    <Center ml={[0, 14]} h={5} w={200}>
      <Logo />
    </Center>
  );
}
