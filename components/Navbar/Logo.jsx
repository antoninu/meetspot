import React from 'react';
import { Center, Button } from '@chakra-ui/react';
import Logo from 'public/logo.svg';
import NextLink from 'next/link';

export default function LogoSection() {
  return (
    <Center ml={[0, 14]} h={5} w={200}>
      <NextLink href="/calendar" style={{ cursor: 'pointer' }}>
        <Logo />
      </NextLink>
    </Center>
  );
}
