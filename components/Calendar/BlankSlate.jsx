import { Box, Button, Flex, Image, Text, Center } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import NextLink from 'next/link';

const BlankSlate = ({ eventos }) => {
  return (
    <Box m={10} borderWidth="1px" p={10} borderRadius={14}>
      <Grid templateColumns="repeat(11, 1fr)" gap={8} mt={3} mx={10} px={5}>
        <GridItem colSpan={2} h="100%">
          <Center>
            <Image src="/images/pen.svg" alt="pen" />
          </Center>
          <Center>
            <Text my={5} align="center">
              Describe tu evento
            </Text>
          </Center>
        </GridItem>
        <GridItem colSpan={1} h="100%">
          <Center>
            <Image src="/images/right-arrow.svg" alt="arrow" />
          </Center>
        </GridItem>
        <GridItem colSpan={2} h="100%">
          <Image src="/images/network.svg" alt="network" />
          <Center>
            <Text my={5} align="center">
              Escoge los usuarios que quieras agregar
            </Text>
          </Center>
        </GridItem>
        <GridItem colSpan={1} h="100%">
          <Image src="/images/right-arrow.svg" alt="arrow" />
        </GridItem>
        <GridItem colSpan={2} h="100%">
          <Image src="/images/calendar.svg" alt="calendar" />
          <Center>
            <Text my={5} align="center">
              Escoge la mejor fecha para todos
            </Text>
          </Center>
        </GridItem>

        <GridItem colSpan={1} h="100%">
          <Image src="/images/right-arrow.svg" alt="arrow" />
        </GridItem>
        <GridItem colSpan={2} h="100%">
          <Image src="/images/comment.svg" alt="check" />
          <Center>
            <Text my={5} align="center">
              Crea tu evento{' '}
            </Text>
          </Center>
        </GridItem>
      </Grid>
      <Flex alignItems="center" justifyContent="space-around">
        <NextLink href="/book">
          <Button my={4} colorScheme="blue">
            Agendar un evento
          </Button>
        </NextLink>
      </Flex>
      <Center pt={4}>
        <Text fontSize="1xl">
          <strong> ¡Meetspot es gratis!</strong>
        </Text>
      </Center>
      <Center>
        <Text> Cualquiera puede utilizarlo sin ningún límite </Text>
      </Center>
    </Box>
  );
};

export default BlankSlate;
