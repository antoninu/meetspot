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
  Avatar,
} from '@chakra-ui/react';
import stringFormatter from 'utils/stringFormatter';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { useEffect, useState } from 'react';
import useStateValue from 'hooks/useStateValue';

function Step2({
  setStep,
  handleFinalInvited,
  handleAddInvited,
  handleAvailability,
  step2terminado,
  userEmails,
  emailsState,
  user,
}) {
  const [emails, setEmails] = emailsState;
  const [pickerItems, setPickerItems] = useState(
    userEmails.filter((element) => element.value != user.correo),
  );
  const [selectedItems, setSelectedItems] = useState(emails);

  const handleSelectedItemsChange = (selectedItems) => {
    let good = true;
    if (selectedItems) {
      selectedItems.forEach((element) => {
        good = handleAddInvited(element.value) && good;
      });
      if (good) setSelectedItems(selectedItems);
    }
  };

  return (
    <div>
      <Heading as="h3" size="lg" mb={7} textAlign="center">
        Invita a tus compañeros
      </Heading>
      <FormControl>
        {/**<FormLabel mt={1}>Correos de los usuarios invitados</FormLabel> */}
        <Flex alignItems="center" justifyContent="space-around">
          <Box>
            <CUIAutoComplete
              highlightItemBg="#90CDF4"
              label="Usuarios Invitados"
              placeholder="invitado@gmail.com..."
              items={pickerItems}
              selectedItems={selectedItems}
              onSelectedItemsChange={(changes) =>
                handleSelectedItemsChange(changes.selectedItems)
              }
              disableCreateItem={true}
            />
          </Box>
        </Flex>
        <Button
          width="100%"
          mt={4}
          type="submit"
          colorScheme="blue"
          onClick={() => {
            if (step2terminado()) {
              setEmails(selectedItems);
              handleFinalInvited(selectedItems);
              handleAvailability();
              setStep(2);
            }
          }}
        >
          Siguiente
        </Button>
      </FormControl>
    </div>
  );
}

export default Step2;
