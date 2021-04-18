import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Calendar from 'components/Calendar/Calendar';
import { useEffect, useState } from 'react';
import useStateValue from 'hooks/useStateValue';
import fetcher from 'utils/fetcher';
import {
  Box,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Flex,
  Comment,
  Spacer,
} from '@chakra-ui/react';

const localizer = momentLocalizer(moment);

const now = new Date();

function Step3({ disp, setStep, handleChangeRule }) {
  //const [disp2, setDisp2] = useState(null);
  //const [loading, setLoading] = useState(true);

  console.log(disp);

  //   useEffect(() => {
  //     if (disp) {
  //       console.log(disp);
  //       let newDisp = disp.map((element) => {
  //         element.start = new Date(element.start);
  //         element.end = new Date(element.end);
  //         return element;
  //       });
  //       setDisp2(newDisp);
  //       setLoading(false);
  //     }
  //   }, []);

  if (!disp) {
    console.log('disp', disp);
    return <p>Loading</p>;
  } else {
    console.log('entra');
    console.log('disp', disp);
    return (
      <div>
        <Heading as="h3" size="lg">
          Paso 3
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

        <Button
          width="40%"
          mt={4}
          type="submit"
          colorScheme="blue"
          onClick={() => setStep(3)}
        >
          Siguiente
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
      </div>
    );
  }
}

export default Step3;
