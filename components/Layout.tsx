import React, { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import { Flex } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

type Props = {
  children?: ReactNode;
  title?: string;
  privateRoute?: boolean;
};

const Layout = ({
  children,
  title = 'Meetspot',
  privateRoute,
}: Props): JSX.Element => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Flex direction="column" h="100%">
      <Navbar privateRoute={privateRoute} />
      <Box flex="1 0 auto">{children}</Box>
      <Box flexShrink={0}>
        <Footer />
      </Box>
    </Flex>
  </>
);

export default Layout;
