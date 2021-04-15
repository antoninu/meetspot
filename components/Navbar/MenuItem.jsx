import { ReactNode } from 'react';
import { Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';


const MenuItem = ({ children, to = '/' }) => {
  return (
    <NextLink href={to} passHref>
      <Link>
        <Text display="block">{children}</Text>
      </Link>
    </NextLink>
  );
};

export default MenuItem;
