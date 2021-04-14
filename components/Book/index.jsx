import {
  Box,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const Book = (): JSX.Element => {
  return (
    <Box h="100vh" p={14} mt={14} maxWidth={['100%', '40%']}>
      <Heading mb={4}>Agendar un evento</Heading>

      <FormControl id="signup">
        <FormLabel>Nombre</FormLabel>
        <Input type="name" placeholder="Nombre..." />
        <FormLabel mt={1}>Descripción</FormLabel>
        <Input type="name" placeholder="Descripción..." />
        <FormLabel mt={1}>Tiempo en minutos</FormLabel>
        <Input type="number" placeholder="Minutos..." />

        <NextLink href="/calendar">
          <Button width="100%" mt={4} type="submit" colorScheme="blue">
            Siguiente
          </Button>
        </NextLink>
      </FormControl>
    </Box>
  );
};

export default Book;
