import { ReactNode } from 'react';
import { Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

type Props = {
  children: ReactNode;
  to?: string;
};

const MenuItem = ({ children, to = '/' }: Props): JSX.Element => {
  return (
    <NextLink href={to} passHref>
      <Link>
        <Text display="block">{children}</Text>
      </Link>
    </NextLink>
  );
};

export default MenuItem;
