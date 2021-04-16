import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Flex,
  } from '@chakra-ui/react'
  
  function Step2({handleChangeInvited, handleAddInvited, setStep, handleAvailability}) {
    return (
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

        <Box id="invited-list" 
         borderWidth="2px"
         px={7}
         py={3}
         marginTop="12px"
         borderRadius={14}>
           <FormLabel mt={1}>Lista de usuarios invitados</FormLabel>
        </Box>

          <Button
            width="100%"
            mt={4}
            type="submit"
            colorScheme="blue"
            onClick={()=> {handleAvailability(); setStep(2);}}
          >
            Siguiente
          </Button>
      </FormControl>
    );
}

export default Step2;