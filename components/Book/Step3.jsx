import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  Button,
  Heading,
  FormLabel,
  Input,
  Spacer,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react';

const localizer = momentLocalizer(moment);

function Step3({
  disp,
  setStep,
  handleChangeRule,
  step3terminado,
  verficarDisponibilidad,
  availabilityCheck,
  ruleData,
}) {
  if (!disp) {
    return <p>Cargando...</p>;
  } else {
    return (
      <FormControl>
        <Heading as="h3" size="lg" mb={7} textAlign="center">
          Verifica sus disponibilidades
        </Heading>
        <p>
          Con base en tu disponibilidad y en la de tus invitados, escoje el
          horario que mejor te convenga
        </p>
        <FormLabel mt={1}>Dia seleccionado</FormLabel>
        <Input
          type="date"
          placeholder="Dia seleccionado"
          onChange={handleChangeRule('dia')}
        />

        <FormLabel mt={1}>Hora inicio</FormLabel>
        <Input
          type="time"
          placeholder="Hora inicio..."
          onChange={handleChangeRule('horaInicio')}
        />

        <FormLabel mt={1}>Hora finalizacion </FormLabel>
        <Input
          type="time"
          placeholder="Hora fin..."
          onChange={handleChangeRule('horaFin')}
        />
        {(!ruleData.dia || !ruleData.horaInicio || !ruleData.horaFin) && (
          <FormHelperText color="red">
            Debe seleccionar un dia y las horas antes de verificar la
            disponibilidad
          </FormHelperText>
        )}
        <Button
          w="100%"
          mt={4}
          colorScheme="blue"
          mr={4}
          disabled={!ruleData.dia || !ruleData.horaInicio || !ruleData.horaFin}
          onClick={() => {
            verficarDisponibilidad();
          }}
        >
          Verificar Disponibilidad
        </Button>
        <Spacer></Spacer>
        <Heading as="h4" size="md" p={2}>
          Horarios en los que todos están disponibles:
        </Heading>

        <BigCalendar
          localizer={localizer}
          events={disp}
          defaultView="week"
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
        {!availabilityCheck && (
          <FormHelperText color="red">
            Debe verificar la disponibilidad antes de proceder
          </FormHelperText>
        )}
        <Button
          w="100%"
          mt={4}
          type="submit"
          colorScheme="blue"
          disabled={!availabilityCheck}
          onClick={() => {
            if (step3terminado()) setStep(3);
          }}
        >
          Siguiente
        </Button>
      </FormControl>
    );
  }
}

export default Step3;
