import { Flex, Box, Img } from '@chakra-ui/react';
import HeroText from 'components/Home/HeroText';

const Hero = () => {
  return (
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
  );
};

export default Hero;
