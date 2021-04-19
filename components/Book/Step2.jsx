import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
  Text,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import stringFormatter from 'utils/stringFormatter';
import { SmallCloseIcon } from '@chakra-ui/icons';

function Step2({
  handleChangeInvited,
  handleAddInvited,
  setStep,
  handleAvailability,
  invitedListState,
}) {
  const [invitedList, setInvitedList] = invitedListState;
  const toast = useToast();

  return (
    <div>
      <Heading as="h3" size="lg" mb={7} textAlign="center">
        Invita a tus compañeros
      </Heading>
      <FormControl>
        <FormLabel mt={1}>Correos de los usuarios invitados</FormLabel>
        <Flex alignItems="center" justifyContent="space-around">
          <Input
            type="email"
            placeholder="Correo invitado..."
            width="85%"
            onChange={handleChangeInvited()}
          />
          <Button
            mt={4}
            type="submit"
            colorScheme="blue"
            margin="0"
            onClick={handleAddInvited()}
          >
            +
          </Button>
        </Flex>

        <Box
          id="invited-list"
          borderWidth="2px"
          px={7}
          py={3}
          marginTop="12px"
          borderRadius={14}
        >
          <FormLabel mt={1}>Usuarios invitados</FormLabel>
          {invitedList.length > 0 ? (
            invitedList.map((invitado, id) => (
              <Text key={id} py={2}>
                {invitado
                  ? stringFormatter(
                      invitado.nombre + ' ' + invitado.apellido,
                      'name',
                    ) +
                    ' - ' +
                    invitado.correo
                  : ''}
                <IconButton
                  icon={<SmallCloseIcon />}
                  colorScheme="red"
                  variant="outline"
                  size="sm"
                  mx={2}
                  onClick={() => {
                    setInvitedList(
                      invitedList.filter((el) => {
                        return el.nombre != invitado.nombre;
                      }),
                    );
                    toast({
                      title: 'Invitado eliminado',
                      description: `${invitado.nombre} ya no será invitado a tu evento.`,
                      status: 'warning',
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                />
              </Text>
            ))
          ) : (
            <Text>Ninguno</Text>
          )}
        </Box>

        <Button
          width="100%"
          mt={4}
          type="submit"
          colorScheme="blue"
          onClick={() => {
            handleAvailability();
            setStep(2);
          }}
        >
          Siguiente
        </Button>
      </FormControl>
    </div>
  );
}

export default Step2;
