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

  return (
    <div>
      <Heading as="h3" size="lg">
        Paso 2
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
          <FormLabel mt={1}>Lista de usuarios invitados</FormLabel>
          {invitedList.map((invitado, id) => (
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
                colorScheme="blue"
                variant="outline"
                size="sm"
                mx={2}
                onClick={() =>
                  setInvitedList(
                    invitedList.filter((el) => {
                      return el.nombre != invitado.nombre;
                    }),
                  )
                }
              />
            </Text>
          ))}
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
