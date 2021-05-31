import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import { Flex } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useStateValue from 'hooks/useStateValue';

const Layout = ({ children, title = 'Meetspot', privateRoute = false }) => {
  const router = useRouter();
  const [, dispatch] = useStateValue();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch({ type: 'LOG_IN', newUser: user });
    if (process.browser && privateRoute && !user) {
      router.push('/');
    }
    if(process.browser && user){
      router.push('/calendar');
    }
  },[])


  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar privateRoute={privateRoute} />
      <Flex direction="column" minH="100vh">
        <Box flex="1 0 auto">{children}</Box>
        <Box flexShrink={0}>
          <Footer />
        </Box>
      </Flex>
    </>
  );
};

export default Layout;
