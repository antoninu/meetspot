import { Flex, Box, Img, Heading, Text } from '@chakra-ui/react';
import HeroText from 'components/Home/HeroText';
import { FormattedMessage } from 'react-intl';

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
        <Heading>FAQ</Heading>
        <Heading as="h5" size="md"><FormattedMessage id="FAQ_question1" /></Heading>
        <Text><FormattedMessage id="FAQ_answer1" /></Text>
        <Heading as="h5" size="md"><FormattedMessage id="FAQ_question2" /></Heading>
        <Text><FormattedMessage id="FAQ_answer3" /></Text>
        <Heading as="h5" size="md"><FormattedMessage id="FAQ_question3" /></Heading>
        <Text><FormattedMessage id="FAQ_answer2" /></Text>
<Heading>FAQ</Heading>
        <Heading as="h5" size="md"><FormattedMessage id="FAQ_question1" /></Heading>
        <Text><FormattedMessage id="FAQ_answer1" /></Text>
        <Heading as="h5" size="md"><FormattedMessage id="FAQ_question2" /></Heading>
        <Text><FormattedMessage id="FAQ_answer3" /></Text>
        <Heading as="h5" size="md"><FormattedMessage id="FAQ_question3" /></Heading>
        <Text><FormattedMessage id="FAQ_answer2" /></Text>
      </div>
    </>
  );
};

export default Hero;
