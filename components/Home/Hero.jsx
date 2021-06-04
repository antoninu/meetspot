import { Flex, Box, Img, Heading, Text } from '@chakra-ui/react';
import HeroText from 'components/Home/HeroText';

const Hero = () => {
  return (
    <>
      <Flex
        ml={[0, 14]}
        align="center"
        direction={{ base: 'column', md: 'row' }}
        justify={{ base: 'center', md: 'space-between' }}
        h="100%"
        px={[7, 7, 0]}
        py={[14]}
        minH="80vh"
      >
        <Box h="100%">
          <HeroText />
        </Box>
        <Box h="100%">
          <Img alt="HERO_IAMGE" src="/images/meetspothero.webp" />
        </Box>
      </Flex>
      <div
        ml={[0, 14]}
        align="center"
        h="100%"
        px={[7, 7, 0]}
        py={[14]}
        minH="80vh"
      >
        <Heading mb={4}>FAQ</Heading>
        <Heading as="h5" size="md">
          Do I have to pay for the service?
        </Heading>
        <Text mb={2}>Not necessary for now.</Text>
        <Heading as="h5" size="md">
          Do my partners need to have an account to access this service?
        </Heading>
        <Text mb={2}>
          Yes they do in order for us to let you know their availabilities.
        </Text>
        <Heading as="h5" size="md">
          Can I load my schedule with my current Google Calendar?
        </Heading>
        <Text mb={10}>
          Not for the moment, but it will be an incoming feature.
        </Text>
      </div>
    </>
  );
};

export default Hero;
