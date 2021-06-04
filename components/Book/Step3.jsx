import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import {
  Button,
  Heading,
  FormLabel,
  Input,
  Spacer,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

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
          <FormattedMessage id="create_check_title" />
        </Heading>
        <p>
          <FormattedMessage id="create_check_invitation" />
        </p>
        <FormLabel mt={1}><FormattedMessage id="create_selected_day" /></FormLabel>
        <Input
          type="date"
          placeholder="Dia seleccionado"
          onChange={handleChangeRule('dia')}
        />

        <FormLabel mt={1}><FormattedMessage id="create_start_hour" /></FormLabel>
        <Input
          type="time"
          placeholder="Hora inicio..."
          onChange={handleChangeRule('horaInicio')}
        />

        <FormLabel mt={1}><FormattedMessage id="create_end_hour" /></FormLabel>
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
          <FormattedMessage id="create_check_availability" />
        </Button>
        <Spacer></Spacer>
        <Heading as="h4" size="md" p={2}>
          <FormattedMessage id="create_check_schedules_title" />:
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
          <FormattedMessage id="create_next" />
        </Button>
      </FormControl>
    );
  }
}

export default Step3;
