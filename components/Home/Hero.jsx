import { Flex, Box, Img } from '@chakra-ui/react';
import HeroText from 'components/Home/HeroText';

const Hero = () => {
  return (
    <Flex
      ml={[0, 14]}
      align="center"
      direction={{ base: 'column', md: 'row' }}
      justify={{ base: 'center', md: 'space-between' }}
      minH="100vh"
    >
      <Box>
        <HeroText />
      </Box>
      <Box>
        <Img alt="HERO_IAMGE" src="/images/meetspothero.webp" />
      </Box>
    </Flex>
  );
};

export default Hero;
