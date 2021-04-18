import { useState, useEffect } from 'react';
import { Box, Heading, Text, useToast } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import useStateValue from 'hooks/useStateValue';
import fetcher from 'utils/fetcher';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

/**
 * {
    "nombre":"nombre",
    "descripcion": "descripcion",
    "diaInicio": "{{todayDate}}",
    "diaFin": "{{todayDate}}",
    "frecuencia": "diaria",
    "estado": "aceptado",
    "zonaHoraria": "+5",
} 
 */

const Book = () => {
  const router = useRouter();
  const [eventData, setEventData] = useState({});
  const [ruleData, setRuleData] = useState({});
  const [invitedData, setInvitedData] = useState('');
  const [invitedList, setInvitedList] = useState([]);
  const [error, setError] = useState(null);
  const [, dispatch] = useStateValue();
  const [disp, setDisp] = useState(null);

  const toast = useToast();

  const [{ user }] = useStateValue();
  const [step, setStep] = useState(0);

  useEffect(() => {
    revisarFechas();
  }, [eventData]);

  //Manejan el estado del evento
  const handleChange = (key) => async (event) => {
    setError(null);
    setEventData({ ...eventData, [key]: event.target.value });
  };

  const revisarFechas = () => {
    if (eventData && eventData.diaInicio && eventData.diaFin) {
      if (
        !fechasValidas(
          new Date(eventData.diaFin),
          new Date(eventData.diaInicio),
        )
      ) {
        console.log('toast');
        toast({
          title: 'Error en las fechas',
          description: 'El día final no puede ser anterior al día de inicio',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const step1terminado = () => {
    if (
      !fechasValidas(new Date(eventData.diaFin), new Date(eventData.diaInicio))
    ) {
      toast({
        title: 'Error en las fechas',
        description: 'El día final no puede ser anterior al día de inicio',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    } else {
      return true;
    }
  };

  const fechasValidas = (fechaMayor, fechaMenor) =>
    fechaMayor.getTime() >= fechaMenor.getTime();

  //Manejan el estado de la regla
  const handleChangeRule = (key) => async (event) => {
    setError(null);
    setRuleData({ ...ruleData, [key]: event.target.value });
  };

  const handleSubmit = async () => {
    // Crear el evento
    console.log(eventData);
    eventData.estado = 'aceptado';
    eventData.zonaHoraria = '+5';
    const response = await fetcher('eventos/', 'POST', eventData);

    if (response.error) {
      setError(response.error);
    }

    console.log(ruleData);
    const p1 = new Date(ruleData.dia);
    p1.setHours(ruleData.horaInicio.split(':')[0]);
    p1.setMinutes(ruleData.horaInicio.split(':')[1]);
    ruleData.horaInicio = p1;

    const p2 = new Date(ruleData.dia);
    p2.setHours(ruleData.horaFin.split(':')[0]);
    p2.setMinutes(ruleData.horaFin.split(':')[1]);
    ruleData.horaFin = p2;

    ruleData.unidad = p2.getDay();
    delete ruleData.dia;

    console.log(ruleData);

    // Crear la regla

    const response2 = await fetcher('reglas/', 'POST', ruleData);
    if (response2.error) {
      setError(response2.error);
    }
    // Agregar la regla al evento
    console.log('resoponses', response);
    const response3 = await fetcher(
      `eventos/${response._id}/reglas/${response2._id}`,
      'PATCH',
    );
    if (response3.error) {
      setError(response3.error);
    }
    // Agregar el evento
    const response4 = await fetcher(
      `usuarios/${user._id}/eventos/${response._id}`,
      'PATCH',
    );
    if (response4.error) {
      console.log('error');
      setError(response4.error);
    } else {
      await router.push('/calendar');
    }
  };

  //Manejan el estado del usuario a ser invitado
  const handleChangeInvited = () => async (event) => {
    setError(null);
    setInvitedData(event.target.value);
  };

  const handleAddInvited = () => async () => {
    /**const response = await fetcher('usuarios/', 'POST', invitedData);

    if (response.error) {
      setError(response.error);
    } else {
    */
    // Asumiendo que todo esta bien
    setError(null);
    setInvitedList([...invitedList, invitedData]);
    let append = document.createElement('div');
    append.innerText = invitedData;
    document.getElementById('invited-list').appendChild(append);
    //}
  };

  //Manejan el estado de la lista de usuarios a ser invitados
  const handleChangeInvitedList = () => async (event) => {
    setError(null);
    setInvitedList([...invitedList, invitedData]);

    document
      .getElementById('invited-list')
      .appendChild(<Text>{invitedData}</Text>);
  };

  const handleAvailability = async () => {
    const response = await fetcher(
      `usuarios/${user._id}/disponibilidad`,
      'GET',
    );
    if (response.error) {
      setError(response.error);
    } else {
      //console.log('Disponibilidad: ', response);
      let newDisp = response.map((element) => {
        element.start = new Date(element.start);
        element.end = new Date(element.end);
        return element;
      });
      //console.log('Con dates: ', newDisp);
      setDisp(newDisp);
    }
  };

  return (
    <Box h="100vh" p={14} mt={14} maxWidth={['100%']}>
      <Heading mb={4}>Agendar un evento</Heading>
      {step === 0 && (
        <Step1
          setStep={setStep}
          handleChange={handleChange}
          step1terminado={step1terminado}
        />
      )}
      {step === 1 && (
        <Step2
          setStep={setStep}
          handleChangeInvited={handleChangeInvited}
          handleAddInvited={handleAddInvited}
          handleAvailability={handleAvailability}
        />
      )}
      {step === 2 && (
        <Step3
          setStep={setStep}
          disp={disp}
          handleChangeRule={handleChangeRule}
        />
      )}
      {step === 3 && (
        <Step4 eventData={eventData} handleSubmit={handleSubmit} />
      )}
    </Box>
  );
};

export default Book;
