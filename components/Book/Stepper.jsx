import { HStack, IconButton, Divider, VStack, Heading } from '@chakra-ui/react';
import {
  EditIcon,
  EmailIcon,
  CalendarIcon,
  CheckCircleIcon,
} from '@chakra-ui/icons';

export default function Stepper({ step, setStep }) {
  return (
    <HStack w="100%" justifyContent="space-between" py={2}>
      <VStack>
        <IconButton
          aria-label="Crea tu evento"
          colorScheme={step === 0 ? 'blue' : 'green'}
          onClick={() => {
            if (step > 0) {
              setStep(0);
            }
          }}
          icon={<EditIcon aria-label="edit-icon" />}
        />
        <Heading color={step === 0 ? '#3182ce' : '#38a169'}>1</Heading>
      </VStack>
      <Divider />
      <VStack>
        <IconButton
          aria-label="Invita a tus compañeros"
          colorScheme={step === 1 ? 'blue' : step > 1 ? 'green' : 'gray'}
          onClick={() => {
            if (step > 1) {
              setStep(1);
            }
          }}
          icon={<EmailIcon aria-label="email-icon" />}
        />
        <Heading color={step === 1 ? '#3182ce' : step > 1 ? '#38a169' : 'gray'}>
          2
        </Heading>
      </VStack>
      <Divider />
      <VStack>
        <IconButton
          aria-label="Verifica las disponibilidades"
          colorScheme={step === 2 ? 'blue' : step > 2 ? 'green' : 'gray'}
          icon={<CalendarIcon aria-label="calendar-icon" />}
          onClick={() => {
            if (step > 2) {
              setStep(2);
            }
          }}
        />
        <Heading color={step === 2 ? '#3182ce' : step > 2 ? '#38a169' : 'gray'}>
          3
        </Heading>
      </VStack>
      <Divider />
      <VStack>
        <IconButton
          aria-label="Confirma los datos"
          colorScheme={step === 3 ? 'blue' : 'gray'}
          icon={<CheckCircleIcon aria-label="check-icon" />}
        />
        <Heading color={step === 3 ? '#3182ce' : 'gray'}>4</Heading>
      </VStack>
    </HStack>
  );
}
